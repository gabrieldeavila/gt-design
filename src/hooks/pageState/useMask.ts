/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INonNumericMask,
  INumericMask,
  TNumericOptions,
} from "../../components/Input/Fields/interface";

const getBestMask = (value: string, options: string[]) => {
  // only keeps numbers and letters
  const valueLength = value.toString().replace(/[^0-9a-z]/gi, "").length;

  // gets the best mask for the value
  // ex.: if values is 123, gets the first mask, but if it is 12345678910, gets the second mask
  const bestMask = options.find((option) => {
    const optionLength = option.replace(/[^0-9a-z]/gi, "").length;

    // if the value length is less than the option length, it is the best mask
    if (valueLength <= optionLength) {
      return true;
    }

    return false;
  });

  return bestMask ?? options[options.length - 1];
};

function useMask(
  value: string | number,
  mask: TNumericOptions,
  inpRef: React.RefObject<HTMLInputElement>
) {
  const currPosition = useRef<null | number>(0);
  const isDeleting = useRef(false);
  const [forceReset, setForceReset] = useState(false);

  const handleNumericMask = useCallback(
    (value: string | number, mask: INumericMask) => {
      const {
        prefix,
        decimalLimit,
        decimalSymbol,
        thousandsSeparatorSymbol,
        suffix,
        allowNegative,
      } = mask;
      const currValue = !value ? "0" : value.toString();

      const [currIntegerValue, currDecimalValue = "0"] = currValue.split(".");

      const newDecimal = currDecimalValue.padEnd(decimalLimit, "0");

      // adds the thousands separator symbol
      let newInteger = currIntegerValue.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandsSeparatorSymbol
      );

      if (allowNegative && currValue.includes("-")) {
        // removes the negative symbol from the value
        newInteger = newInteger.replace("-", "");

        return `-${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;
      }

      const newValue = `${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;

      return newValue;
    },
    []
  );

  // prevents the cursor from going to wrong position
  const getRightPosition = useCallback(
    (currInpPosition: number, maskedValue: string) => {
      let newPosition = currInpPosition;

      if (isDeleting.current) {
        for (let i = currInpPosition; i >= 0; i--) {
          if (/[0-9a-z]/i.test(maskedValue[i])) {
            newPosition = i;
            break;
          }
        }

        isDeleting.current = false;

        // if the new position is 1, then it should not be considered
        // because if we add +1, it will be 2, and the cursor will be in the wrong position
        if (newPosition === 1) {
          currPosition.current = 1;
        } else {
          currPosition.current = newPosition === 1 ? 1 : newPosition + 1;
        }

        return;
      }

      // do a for loop to get the right position, because maybe the next is also a symbol
      for (let i = currInpPosition; i < maskedValue.length; i++) {
        if (/[0-9a-z]/i.test(maskedValue[i])) {
          newPosition = i;
          break;
        }
      }

      currPosition.current = newPosition + 1;
    },
    []
  );

  const handleNonNumericMask = useCallback(
    (value: string | number, mask: INonNumericMask) => {
      // options may be ['999.999.999-99', '99.999.999/9999-99']
      const { options } = mask;
      const bestMask = getBestMask(value.toString(), options);

      if (!bestMask) return value;

      let maskedValue = "";

      const valueChars = value.toString().split("");

      // now masks the value
      let index = 0;
      for (const char of bestMask.split("")) {
        if (!/[0-9a-z]/i.test(char)) {
          maskedValue += char;
          continue;
        }

        const isNumber = /[0-9]/.test(char);
        const isLetter = /[a-z]/i.test(char);
        const isFollowingMaskOrder =
          (/[0-9]/.test(valueChars[index]) && isNumber) ||
          (/[a-z]/i.test(valueChars[index]) && isLetter);

        if (!isFollowingMaskOrder || char === "_") {
          maskedValue += "_";
          index += 1;

          setForceReset((prev: boolean) => !prev);
          continue;
        }

        if (["9", "A"].includes(char)) {
          maskedValue += valueChars[index] || "_";
          index += 1;
        }
      }

      const currInpPosition = inpRef.current?.selectionStart ?? 0;
      const currMaskPosition = maskedValue[currInpPosition - 1];

      // if the currMaskPosition is not a number or a letter, shall move the cursor to the next position
      const isNumberOrLetter = /[0-9a-z]/i.test(currMaskPosition);

      // puts the cursor where the user is typing
      if (isNumberOrLetter) {
        currPosition.current = currInpPosition;
      } else {
        getRightPosition(currInpPosition, maskedValue);
      }

      return maskedValue;
    },
    [getRightPosition, inpRef]
  );

  const handleMaskValue = useCallback(
    (value: string | number, mask: TNumericOptions) => {
      if (mask.type === "numeric_mask") {
        return handleNumericMask(value, mask);
      }

      if (mask.type === "non_numeric_mask") {
        return handleNonNumericMask(value, mask);
      }

      return value;
    },
    [handleNonNumericMask, handleNumericMask]
  );

  // masks the value, example: 1234567.89 => $1,234,567.89
  const maskedValue = useMemo(() => {
    return handleMaskValue(value, mask);
  }, [handleMaskValue, mask, value]);

  useEffect(() => {
    if (mask.type === "non_numeric_mask" && inpRef.current != null) {
      inpRef.current.setSelectionRange(
        currPosition.current,
        currPosition.current
      );
    }
  }, [maskedValue, forceReset]);

  const unMaskNumeric = useCallback(
    (valToUnMask: number | string, mask: INumericMask) => {
      const { decimalLimit, integerLimit, allowNegative } = mask;
      valToUnMask = valToUnMask.toString();

      let removedSuffix = false;
      let isNegative = false;

      // if it has a suffix in the mask, but not in the value
      // it removes the suffix from the value
      if (mask.suffix && !valToUnMask.includes(mask.suffix)) {
        removedSuffix = true;
      }

      if (
        allowNegative &&
        valToUnMask.includes("-") &&
        !valToUnMask.includes("+")
      ) {
        isNegative = true;
      }

      // only accepts numbers
      let currValue = valToUnMask.replace(/[^\d]/g, "");

      let newValue = "0";

      // if it reaches both limits, removes the first digit
      if (currValue.length > decimalLimit + integerLimit) {
        // removes the first digit
        currValue = currValue.slice(1);
      }

      // if removedSuffix is true, it removes the last digit
      if (removedSuffix) {
        currValue = currValue.slice(0, -1);
      }

      // adds the decimal symbol, ex.: 00010 => 0.0010, using splice based on the decimal limit
      const currInt = currValue.slice(0, -decimalLimit) || "0";
      const currDec = currValue.slice(-decimalLimit) || "0";

      newValue = `${currInt}.${currDec}`;

      if (isNegative) {
        newValue = `-${newValue}`;
      }

      return parseFloat(newValue || "0");
    },
    []
  );

  const unMaskNonNumeric = useCallback(
    (valToUnMask: number | string, mask: INonNumericMask) => {
      const { options } = mask;

      // if user is typing in the end of the value, adds it to the begin, but only if there is no other number
      // only keeps letters and numbers
      const onlyNumbersAndLetters = valToUnMask
        .toString()
        .replace(/[^0-9a-z]/gi, "").length;

      // gets the last char of the value
      const lastChar = valToUnMask
        .toString()
        .slice(-1)
        .replace(/[^0-9a-z]/gi, "").length;

      if (onlyNumbersAndLetters === 1 && lastChar === 1) {
        inpRef.current?.setSelectionRange(1, 1);
        valToUnMask = `${valToUnMask.toString().slice(-1)}${valToUnMask
          .toString()
          .slice(0, -1)}`;
      }

      const unMask = valToUnMask.toString().split("");
      let newValue = "";

      let bestMask = getBestMask(valToUnMask.toString(), options);
      // only keeps letters and numbers
      bestMask = bestMask.replace(/[^0-9a-z]/gi, "");

      // removes the mask characters
      unMask.forEach((char) => {
        // se for um número ou letra, adiciona no novo valor
        if (/[0-9a-z]/i.test(char) || char === "_") {
          newValue += char;
        }
      });

      // if the value is bigger than the mask, removes the last char
      if (newValue.length > bestMask.length) {
        newValue = newValue.slice(0, -1);
      }

      // if value has less chars than valToUnMask, it means that the user is removing chars
      const newValueOnlyChars = newValue.replace(/[^0-9a-z]/gi, "");
      const prevValueOnlyChars = value.toString().replace(/[^0-9a-z]/gi, "");

      isDeleting.current = prevValueOnlyChars.length > newValueOnlyChars.length;

      return newValue;
    },
    [inpRef, value]
  );

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string) => {
      if (mask.type === "numeric_mask") {
        return unMaskNumeric(valToUnMask, mask);
      }

      if (mask.type === "non_numeric_mask") {
        return unMaskNonNumeric(valToUnMask, mask);
      }

      return valToUnMask;
    },
    [mask, unMaskNonNumeric, unMaskNumeric]
  );

  return { handleMaskValue, maskedValue, unMask };
}

export default useMask;
