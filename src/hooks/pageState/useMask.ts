/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useMemo } from "react";
import {
  INonNumericMask,
  INumericMask,
  TNumericOptions,
} from "../../components/Input/Fields/interface";

function useMask(value: string | number, mask: TNumericOptions) {
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

  const handleNonNumericMask = useCallback(
    (value: string | number, mask: INonNumericMask) => {
      // options may be ['999.999.999-99', '99.999.999/9999-99']
      const { options } = mask;

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

      if (!bestMask) return value;

      let maskedValue = "";

      // now masks the value
      bestMask.split("").forEach((char) => {
        if (char === "9") {
          maskedValue += value.toString().charAt(0);
          value = value.toString().slice(1);
        } else {
          maskedValue += char;
        }
      });
      console.log(maskedValue);
      return value;
    },
    []
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

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string) => {
      if (mask.type === "numeric_mask") {
        return unMaskNumeric(valToUnMask, mask);
      }

      return valToUnMask;
    },
    [mask, unMaskNumeric]
  );

  return { handleMaskValue, maskedValue, unMask };
}

export default useMask;
