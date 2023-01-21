/**
 *
 * @param value - the current value
 * @param options - all the options
 * @returns - the option that fits the best
 *
 * ex.:
 * value is 123
 *
 * options are: ["99-9", "9999-9"]
 *
 * the best option is "99-9"
 */
function getBestNonNumericMask(value: string, options: string[]) {
  // only keeps numbers and letters
  const valueLength = value.toString().replace(/[^0-9a-z]/gi, "").length;

  // gets the best mask for the value
  // ex.: if values is 123, gets the first mask, but if it is 12345678910, gets the second mask
  const bestMask = options.find((option) => {
    const optionLength = option.replace(/[^0-9a-z]/gi, "").length;

    // if the value length is less than the option length, it is the best mask
    if (valueLength <= optionLength) {
      return true;
    }

    return false;
  });

  return bestMask ?? options[options.length - 1];
}

export default getBestNonNumericMask;
