let timeout: ReturnType<typeof setTimeout>;

function unMaskGuided(
  bestMask: string,
  unMask: string,
  inpRef: React.RefObject<HTMLInputElement>,
  isDeletingMask: boolean,
) {
  let newValue = "";
  let correctMaskIndex = 0;
  unMask = unMask.toString().replace(/[^0-9a-z_]/gi, "");

  if (isDeletingMask) {
    return unMask;
  }

  bestMask.split("").forEach((char, index) => {
    if (!/[0-9a-z]/i.test(char) && char !== "_") {
      return;
    }

    // current char of the mask
    const maskChar = unMask[correctMaskIndex] ?? "_";

    // if the char is a letter, it checks if the maskChar is a letter
    const maskIsLetter = /[a-z]/i.test(maskChar);
    const charIsLetter = /[a-z]/i.test(char);

    // if the char is a number, it checks if the maskChar is a number
    const maskIsNumber = /[0-9]/.test(maskChar);
    const charIsNumber = /[0-9]/.test(char);

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
