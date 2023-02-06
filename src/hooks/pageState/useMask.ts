import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TNumericOptions } from "../../components/Input/Fields/interface";
import useMaskGetters from "./mask/useMaskGetters";
import useUnMaskGetters from "./mask/useUnMaskGetters";

/**
 * It masks the value and returns the masked value
 * @param value - the value to be masked
 * @param mask - the mask to be used
 * @param inpRef - the input ref
 * @returns - { maskedValue, unMask }
 *
 * maskedValue - the masked value
 * unMask - it receives the masked value and returns the unmasked value
 */

function useMask(
  value: string | number,
  mask: TNumericOptions,
  inpRef: React.RefObject<HTMLInputElement>,
  isFirstChange: boolean,
  isGuided?: boolean
) {
  const currPosition = useRef<null | number>(0);
  const isDeleting = useRef(false);
  const [forceReset, setForceReset] = useState(false);

  const { handleMaskValue } = useMaskGetters(
    inpRef,
    currPosition,
    isDeleting,
    setForceReset,
    isGuided
  );

  // masks the value, example: 1234567.89 => $1,234,567.89
  const maskedValue = useMemo(() => {
    if (isFirstChange && !(isGuided ?? false)) {
      return value;
    }

    return handleMaskValue(value, mask);
  }, [handleMaskValue, isFirstChange, isGuided, mask, value]);

  // prevents the cursor from going to wrong position
  useEffect(() => {
    if (mask.type === "non_numeric_mask" && inpRef.current != null) {
      inpRef.current.setSelectionRange(
        currPosition.current,
        currPosition.current
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskedValue, forceReset]);

  const { unMaskNumeric, unMaskNonNumeric } = useUnMaskGetters(
    value,
    inpRef,
    isDeleting
  );

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string, currKey: string) => {
      if (mask.type === "numeric_mask") {
        return unMaskNumeric(valToUnMask, mask, currKey);
      }

      if (mask.type === "non_numeric_mask") {
        return unMaskNonNumeric(valToUnMask, mask);
      }

      return valToUnMask;
    },
    [mask, unMaskNonNumeric, unMaskNumeric]
  );

  return { maskedValue, unMask };
}

export default useMask;
