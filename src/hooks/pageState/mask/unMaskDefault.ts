/* eslint-disable @typescript-eslint/strict-boolean-expressions */
let timeout: ReturnType<typeof setTimeout>;

function unMaskDefault(
  bestMask: string,
  unMask: string,
  inpRef: React.RefObject<HTMLInputElement>,
  isDeletingMask: boolean
) {
  let newValue = "";

  bestMask = bestMask.replace(/[^0-9a-z]/gi, "");
  const unMaskArr = unMask.split("");

  if (isDeletingMask) {
    console.log(unMask.replace(/[^0-9a-z_]/gi, ""));
    // console.log();
    return unMask.replace(/[^0-9a-z_]/gi, "");
  }

  let correctIndex = 0;

  // removes the mask characters
  unMaskArr.forEach((char, index) => {
    if (!/[0-9a-z]/i.test(char)) {
      return;
    }

    const maskChar = bestMask[correctIndex];
    if (!maskChar) {
      correctIndex += 1;

      return;
    }

    const maskIsLetter = /[a-z]/i.test(maskChar);
    const charIsLetter = /[a-z]/i.test(char);

    const maskIsNumber = /[0-9]/.test(maskChar);
    const charIsNumber = /[0-9]/.test(char);

    if ((maskIsLetter && charIsLetter) || (maskIsNumber && charIsNumber)) {
      clearTimeout(timeout);
      newValue += char;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        inpRef.current?.setSelectionRange(index, index);
      });
    }
    correctIndex += 1;
  });

  return newValue;
}

export default unMaskDefault;
