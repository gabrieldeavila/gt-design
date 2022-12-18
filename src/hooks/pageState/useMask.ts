import { useCallback, useEffect, useMemo } from "react";
import { INumericMask } from "../../components/Input/Fields/interface";

// const generateMask = (mask: INumericMask) => {
//   const {
//     suffix,
//     prefix,
//     thousandsSeparatorSymbol,
//     decimalSymbol,
//     decimalLimit,
//     integerLimit,
//     allowNegative,
//     allowLeadingZeroes,
//   } = mask;
// };

function useMask(value: string | number, mask: INumericMask) {
  // masks the value, example: 1234567.89 => $1,234,567.89
  const maskedValue = useMemo(() => {
    const { prefix } = mask;
    // my idea: 
    // const regex = ":prefix:value:suffix";

    return `${prefix}${value}`;
  }, [mask, value]);

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string) => {
      const { prefix } = mask;
      const unMasked = valToUnMask.toString().replace(prefix, "");
      console.log(unMasked);
      return unMasked;
    },
    [mask]
  );

  return { maskedValue, unMask };
}

export default useMask;
