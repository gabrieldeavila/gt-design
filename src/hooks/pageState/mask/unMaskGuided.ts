
let timeout: ReturnType<typeof setTimeout>;

function unMaskGuided(
  bestMask: string,
  unMask: string,
  inpRef: React.RefObject<HTMLInputElement>
) {
  let newValue = "";

  let correctMaskIndex = 0;
  bestMask.split("").forEach((char, index) => {
    if (!/[0-9a-z]/i.test(char) && char !== "_") {
      return;
    }

    // current char of the mask
    let maskChar = unMask[correctMaskIndex] ?? "_";

    let isIncorrect = true;

    while (isIncorrect) {
      const currBestMask = bestMask[correctMaskIndex];

      if (
        !/[0-9a-z]/i.test(currBestMask) &&
        currBestMask !== "_" &&
        /[0-9a-z]/i.test(maskChar)
      ) {
        correctMaskIndex += 1;
      } else if (!/[0-9a-z]/i.test(maskChar) && maskChar !== "_") {
        correctMaskIndex += 1;
        maskChar = unMask[correctMaskIndex];
      } else {
        isIncorrect = false;
      }
    }

    // if the char is a letter, it checks if the maskChar is a letter
    const maskIsLetter = /[a-z]/i.test(maskChar);
    const charIsLetter = /[a-z]/i.test(char);

    // if the char is a number, it checks if the maskChar is a number
    const maskIsNumber = /[0-9]/.test(maskChar);
    const charIsNumber = /[0-9]/.test(char);
    console.log(maskChar, char, index, correctMaskIndex);

    if (
      (maskIsLetter && charIsLetter) ||
      (maskIsNumber && charIsNumber) ||
      maskChar === "_"
    ) {
      clearTimeout(timeout);
      newValue += maskChar;
    } else {
      clearTimeout(timeout);
      // adds the char to the correct position
      timeout = setTimeout(() => {
        inpRef.current?.setSelectionRange(index, index);
      });
    }

    // the correctMaskIndex is the index of the unMask and not of the bestMask
    correctMaskIndex += 1;
  });

  return newValue;
}

export default unMaskGuided;
