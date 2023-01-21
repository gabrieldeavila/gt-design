/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";

/**
 * It masks a non numeric value
 * @param value - the value to be masked
 * @param bestMask - the mask that best fits the value
 * @param setForceReset - it forces the input cursor to be reset
 * @returns - the masked value
 *
 * @example
 * "033652000001" -> "033.652.000-001"
 */

function getNonNumericMask(
  value: string | number,
  bestMask: string,
  setForceReset?: React.Dispatch<React.SetStateAction<boolean>>
) {
  let newMask = "";

  const valueChars = value.toString().split("");

  // now masks the value
  let index = 0;
  for (const char of bestMask.split("")) {
    if (!/[0-9a-z]/i.test(char)) {
      newMask += char;
      continue;
    }

    const isNumber = /[0-9]/.test(char);
    const isLetter = /[a-z]/i.test(char);
    const isFollowingMaskOrder =
      (/[0-9]/.test(valueChars[index]) && isNumber) ||
      (/[a-z]/i.test(valueChars[index]) && isLetter);

    if (!isFollowingMaskOrder || char === "_") {
      newMask += "_";
      index += 1;

      setForceReset?.((prev: boolean) => !prev);
      continue;
    }

    if (["9", "A"].includes(char)) {
      newMask += valueChars[index] || "_";
      index += 1;
    }
  }

  return newMask;
}

export default getNonNumericMask;
