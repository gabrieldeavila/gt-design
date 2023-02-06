/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { INumericMask } from "../../../components/Input/Fields/interface";

/**
 * It unmasks a numeric mask
 * @param valToUnMask - the value to be unmasked
 * @param mask - the mask to be used
 * @returns - unmasked value
 *
 * @example
 * "$1,234,567.89" => 1234567.89
 */

function getUnMaskedNumeric(
  valToUnMask: string | number,
  mask: INumericMask,
  currKey: string
) {
  const { decimalLimit, integerLimit, allowNegative } = mask;
  valToUnMask = valToUnMask.toString();
  let removedSuffix = false;
  let isNegative = false;
  let newValue = "0";

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
  valToUnMask = valToUnMask.replace(/[^\d]/g, "");

  // when the user types the first digit, it adds the decimal symbol
  // this prevents the user from typing a number like 0.10 instead of 0.01
  if (valToUnMask.length === 1 && currKey !== "Backspace") {
    valToUnMask = "0".repeat(decimalLimit) + valToUnMask;

    // there is no need to remove the suffix, because it was not added yet
    removedSuffix = false;
  }

  let currValue = valToUnMask;

  // if it reaches both limits, removes the first digit
  if (currValue.length > decimalLimit + integerLimit) {
    // removes the first digit
    currValue = currValue.slice(1);
  }

  // if removedSuffix is true, it removes the last digit
  // ex.:
  // previous value: 10%
  // current value: 10 (user removed the %)
  // new value: 1% (we need to remove the last digit and keep the %)
  if (removedSuffix) {
    currValue = currValue.slice(0, -1);
  }

  // adds the decimal symbol, ex.: 00010 => 0.0010, using splice based on the decimal limit
  let currInt = currValue.slice(0, -decimalLimit) || "0";
  let currDec = currValue.slice(-decimalLimit) || "0";

  if (decimalLimit <= 0) {
    currDec = "0";
    currInt = currValue;
  }

  newValue = `${currInt}.${currDec}`;

  if (isNegative) {
    newValue = `-${newValue}`;
  }

  return parseFloat(newValue || "0");
}

export default getUnMaskedNumeric;
