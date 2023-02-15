import React, { useCallback } from "react";
import {
  INonNumericMask,
  INumericMask,
} from "../../../components/Input/Fields/interface";
import getUnMaskedNonNumeric from "./getUnMaskedNonNumeric";
import getUnMaskedNumeric from "./getUnMaskedNumeric";

/**
 * It creates two functions to unmask the value
 * @param value - the value to unmask
 * @param inpRef - the input ref
 * @param isDeleting - if the user is deleting
 * @returns { unMaskNumeric, unMaskNonNumeric }
 */

function useUnMaskGetters(
  value: string | number,
  inpRef: React.RefObject<HTMLInputElement>,
  isDeleting: React.MutableRefObject<boolean>,
  isGuided?: boolean
) {
  const unMaskNumeric = useCallback(
    (valToUnMask: number | string, mask: INumericMask, currKey: string) => {
      const unMaskedNumeric = getUnMaskedNumeric(valToUnMask, mask, currKey);

      return unMaskedNumeric;
    },
    []
  );

  const unMaskNonNumeric = useCallback(
    (valToUnMask: number | string, mask: INonNumericMask) => {
      const unMaskedNonNumeric = getUnMaskedNonNumeric(
        valToUnMask,
        mask,
        value,
        inpRef,
        isDeleting,
        isGuided
      );

      return unMaskedNonNumeric;
    },
    [inpRef, isDeleting, isGuided, value]
  );

  return { unMaskNumeric, unMaskNonNumeric };
}

export default useUnMaskGetters;
