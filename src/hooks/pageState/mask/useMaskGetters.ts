/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback } from "react";
import {
  INonNumericMask,
  INumericMask,
  TNumericOptions,
} from "../../../components/Input/Fields/interface";
import getBestNonNumericMask from "./getBestNonNumericMask";
import getNonNumericMask from "./getNonNumericMask";
import getNumericMask from "./getNumericMask";
import getRightPosition from "./getRightPosition";

/**
 * It creates a function that returns the best mask for the given value
 * @param inpRef - the input ref
 * @param currPosition - the current position of the cursor
 * @param isDeleting - if the user is deleting
 * @param setForceReset - it forces the input to reset
 * @returns - { handleMaskValue }
 */

function useMaskGetters(
  inpRef: React.RefObject<HTMLInputElement>,
  currPosition: React.MutableRefObject<null | number>,
  isDeleting: React.MutableRefObject<boolean>,
  setForceReset: React.Dispatch<React.SetStateAction<boolean>>,
  isGuided?: boolean
) {
  // prevents the cursor from going to wrong position
  const handleRightPosition = useCallback(
    (currInpPosition: number, maskedValue: string) => {
      getRightPosition(currInpPosition, maskedValue, isDeleting, currPosition);
    },
    [currPosition, isDeleting]
  );

  const handleNumericMask = useCallback(
    (value: string | number, mask: INumericMask) => {
      const newMask = getNumericMask(value, mask);

      return newMask;
    },
    []
  );

  const handleNonNumericMask = useCallback(
    (value: string | number, mask: INonNumericMask) => {
      // options may be ['999.999.999-99', '99.999.999/9999-99']
      const { options } = mask;
      const bestMask = getBestNonNumericMask(value.toString(), options);

      if (!bestMask) return value;

      const newMask = getNonNumericMask(
        value,
        bestMask,
        setForceReset,
        isGuided
      );

      const currInpPosition = inpRef.current?.selectionStart ?? 0;
      const currMaskPosition = newMask[currInpPosition - 1];

      // if the currMaskPosition is not a number or a letter, it shall move the cursor to the next position
      const isNumberOrLetter = /[0-9a-z]/i.test(currMaskPosition);

      // puts the cursor where the user is typing
      if (isNumberOrLetter) {
        currPosition.current = currInpPosition;
      } else {
        handleRightPosition(currInpPosition, newMask);
      }

      return newMask;
    },
    [currPosition, handleRightPosition, inpRef, setForceReset, isGuided]
  );

  // it handles the mask
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

  return { handleMaskValue };
}

export default useMaskGetters;
