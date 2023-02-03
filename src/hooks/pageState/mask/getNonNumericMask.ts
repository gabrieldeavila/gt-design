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

  let maskIndex = 0;
  let mask = "";
  for (const val of valueChars) {
    // checks if the mask char is a special or a number/letter
    let isSpecial = true;

    while (isSpecial) {
      // if it's a special character, adds it to the mask
      if (!/[0-9a-z]/i.test(bestMask[maskIndex])) {
        mask += bestMask[maskIndex];
        maskIndex += 1;
      } else {
        // if it's not, breaks the loop
        isSpecial = false;
      }
    }

    mask += val;

    maskIndex += 1;
  }
  return mask;

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
  console.log(newMask);
  return newMask;
}

export default getNonNumericMask;
