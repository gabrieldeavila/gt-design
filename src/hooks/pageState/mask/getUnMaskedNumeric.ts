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

function getUnMaskedNumeric(valToUnMask: string | number, mask: INumericMask) {
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
}

export default getUnMaskedNumeric;
