/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { INonNumericMask } from "../../../components/Input/Fields/interface";
import getBestNonNumericMask from "./getBestNonNumericMask";

let timeout: ReturnType<typeof setTimeout>;

/**
 * It unmasks a non numeric mask
 * @param valToUnMask - the value to be unmasked
 * @param mask - the mask to be used
 * @param value - the current value
 * @param inpRef - the input reference
 * @param isDeleting - if the user is deleting
 * @returns - the unmasked value
 *
 * @example
 * "0333-333-333" => "333333333"
 */

function getUnMaskedNonNumeric(
  valToUnMask: string | number,
  mask: INonNumericMask,
  value: string | number,
  inpRef: React.RefObject<HTMLInputElement>,
  isDeleting: React.MutableRefObject<boolean>
) {
  const { options } = mask;

  // if the user is typing in the end of the value,
  // it moves the cursor to the begining, but only if there is no other number/letter
  const onlyNumbersAndLetters = valToUnMask
    .toString()
    .replace(/[^0-9a-z]/gi, "").length;

  // gets the last char of the value
  const lastChar = valToUnMask
    .toString()
    .slice(-1)
    .replace(/[^0-9a-z]/gi, "").length;

  // moves to the intial position
  if (onlyNumbersAndLetters === 1 && lastChar === 1) {
    inpRef.current?.setSelectionRange(1, 1);
    valToUnMask = `${valToUnMask.toString().slice(-1)}${valToUnMask
      .toString()
      .slice(0, -1)}`;
  }

  const unMask = valToUnMask.toString().split("");
  let newValue = "";

  let bestMask = getBestNonNumericMask(valToUnMask.toString(), options);
  // only keeps letters and numbers
  bestMask = bestMask.replace(/[^0-9a-z]/gi, "");

  let correctIndex = 0;

  // removes the mask characters
  unMask.forEach((char, index) => {
    if (!/[0-9a-z]/i.test(char)) {
      return;
    }

    const maskChar = bestMask[correctIndex];
    if (!maskChar) {
      correctIndex += 1;

      return;
    }

    const maskIsLetter = /[a-z]/i.test(maskChar);
    const charIsLetter = /[a-z]/i.test(char);

    const maskIsNumber = /[0-9]/.test(maskChar);
    const charIsNumber = /[0-9]/.test(char);

    if ((maskIsLetter && charIsLetter) || (maskIsNumber && charIsNumber)) {
      clearTimeout(timeout);
      newValue += char;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        inpRef.current?.setSelectionRange(index, index);
      });
    }
    correctIndex += 1;
  });

  // if the value is bigger than the mask, removes the last char
  if (newValue.length > bestMask.length) {
    newValue = newValue.slice(0, -1);
  }

  // if the value has less chars than the valToUnMask, it means that the user is removing chars
  const newValueOnlyChars = newValue.replace(/[^0-9a-z]/gi, "");
  const prevValueOnlyChars = value.toString().replace(/[^0-9a-z]/gi, "");

  isDeleting.current = prevValueOnlyChars.length > newValueOnlyChars.length;

  return newValue;
}

export default getUnMaskedNonNumeric;
