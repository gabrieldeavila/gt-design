/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
export function nonNumericGuided(
  bestMask: string,
  valueChars: string[],
  setForceReset?: React.Dispatch<React.SetStateAction<boolean>>
) {
  let newMask = "";
  let index = 0;

  for (const char of bestMask.split("")) {
    if (!/[0-9a-z]/i.test(char)) {
      newMask += char;
      continue;
    }

    const isNumber = /[0-9]/.test(char);
    const isLetter = /[a-z]/i.test(char);
    const isFollowingMaskOrder =
      // @ts-expect-error
      (/[0-9]/.test(valueChars[index]) && isNumber) ||
      // @ts-expect-error
      (/[a-z]/i.test(valueChars[index]) && isLetter);

    if (!isFollowingMaskOrder || char === "_") {
      newMask += "_";
      index += 1;

      setForceReset?.((prev: boolean) => !prev);
      continue;
    }

    if (["9", "A"].includes(char)) {
      newMask += valueChars[index] ?? "_";
      index += 1;
    }
  }

  return newMask;
}

export function nonNumericDefault(bestMask: string, valueChars: string[]) {
  let maskIndex = 0;
  let mask = "";
  for (const val of valueChars) {
    // checks if the mask char is a special or a number/letter
    let isSpecial = true;

    while (isSpecial) {
      // if it's a special character, adds it to the mask
      if (!/[0-9a-z]/i.test(bestMask[maskIndex] ?? "")) {
        mask += bestMask[maskIndex];
        maskIndex += 1;
      } else {
        // if it's not, breaks the loop
        isSpecial = false;
      }
    }
    const isNumber = /[0-9]/.test(val);
    const isLetter = /[a-z]/i.test(val);
    const isFollowingMaskOrder =
      (/[0-9]/.test(bestMask[maskIndex] ?? "") && isNumber) ||
      (/[a-z]/i.test(bestMask[maskIndex] ?? "") && isLetter);

    if (!isFollowingMaskOrder) {
      maskIndex += 1;
      continue;
    }

    mask += val;

    maskIndex += 1;
  }
  return mask;
}
