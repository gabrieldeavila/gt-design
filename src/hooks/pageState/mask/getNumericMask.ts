/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { INumericMask } from "../../../components/Input/Fields/interface";

/**
 * It masks a numeric value
 * @param value - the value to be masked
 * @param mask - the mask to be used
 * @returns - the masked value
 *
 * @example
 * 1234567.89 => "$1,234,567.89"
 */

function getNumericMask(value: string | number, mask: INumericMask) {
  const {
    prefix,
    decimalLimit,
    decimalSymbol,
    thousandsSeparatorSymbol,
    suffix,
    allowNegative,
  } = mask;
  // if the value is null or undefined, by default it will be 0
  const currValue = !value ? "0" : value.toString();

  // splits the value into integer and decimal parts
  const [currIntegerValue, currDecimalValue = "0"] = currValue.split(".");

  // adds the default decimal limit
  // ex.: 1.0 => 1.00
  const newDecimal = currDecimalValue.padEnd(decimalLimit, "0");

  // adds the thousands separator symbol
  // ex.: 1234567 => 1,234,567
  let newInteger = currIntegerValue.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparatorSymbol
  );

  // if the value is negative, it adds the negative symbol
  if (allowNegative && currValue.includes("-")) {
    // removes the negative symbol from the value
    newInteger = newInteger.replace("-", "");

    return `-${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;
  }

  // otherwise, it returns the masked value
  return `${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;
}

export default getNumericMask;
