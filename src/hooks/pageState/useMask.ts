/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useMemo } from "react";
import { INumericMask } from "../../components/Input/Fields/interface";

const createMask = (value: string | number, mask: INumericMask) => {
  const {
    prefix,
    decimalLimit,
    decimalSymbol,
    thousandsSeparatorSymbol,
    suffix,
  } = mask;
  const currValue = !value ? "0" : value.toString();

  const [currIntegerValue, currDecimalValue = "0"] = currValue.split(".");

  const newDecimal = currDecimalValue.padEnd(decimalLimit, "0");

  // adds the thousands separator symbol
  const newInteger = currIntegerValue.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparatorSymbol
  );

  const newValue = `${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;

  return newValue;
};

function useMask(value: string | number, mask: INumericMask) {
  // masks the value, example: 1234567.89 => $1,234,567.89
  const maskedValue = useMemo(() => {
    return createMask(value, mask);
  }, [mask, value]);

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string) => {
      const { decimalLimit } = mask;
      valToUnMask = valToUnMask.toString();

      // only accepts numbers
      const currValue = valToUnMask.replace(/[^\d]/g, "");

      let newValue = "0";

      // if the value is less than the decimal limit, it adds the decimal symbol
      if (currValue.length === decimalLimit) {
        newValue = `0.${currValue}`;
      } else {
        // adds the decimal symbol, ex.: 00010 => 0.0010
        newValue = currValue.replace(/(\d+)(\d{2})$/, "$1.$2");
      }

      return parseFloat(newValue || "0");
    },
    [mask]
  );

  return { maskedValue, unMask };
}

export default useMask;
