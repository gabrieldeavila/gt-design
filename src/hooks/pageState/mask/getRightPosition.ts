/**
 * It finds the right position of the cursor
 * @param currInpPosition - the current position of the cursor
 * @param maskedValue - the value with the mask
 * @param isDeleting - if the user is deleting
 * @param currPosition - the current position of the cursor
 * @returns
 */

function getRightPosition(
  currInpPosition: number,
  maskedValue: string,
  isDeleting: React.MutableRefObject<boolean>,
  currPosition: React.MutableRefObject<null | number>
) {
  let newPosition = currInpPosition;

  // if the user is deleting, then the cursor should go to the left
  if (isDeleting.current) {
    // this for loop is to find where is the next number/letter, as we are deleting, we need to go to the left
    for (let i = currInpPosition; i >= 0; i--) {
      if (/[0-9a-z]/i.test(maskedValue[i])) {
        newPosition = i;
        break;
      }
    }

    isDeleting.current = false;

    // if the new position is 1, then it should not be considered, because he's already in the first position
    // like in (19) 99999-9999, if the user deletes the 1, it should not go to the 0 index
    // but keep in the 1 index
    if (newPosition === 1) {
      currPosition.current = 1;
    } else {
      currPosition.current = newPosition + 1;
    }
  } else {
    // and here as we are adding, we need to go to the right
    for (let i = currInpPosition; i < maskedValue.length; i++) {
      if (/[0-9a-z]/i.test(maskedValue[i])) {
        newPosition = i;
        break;
      }
    }

    currPosition.current = newPosition + 1;
  }
}

export default getRightPosition;
