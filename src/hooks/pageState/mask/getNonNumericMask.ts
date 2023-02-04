/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import { nonNumericDefault, nonNumericGuided } from "./handleNonNumericOptions";

/**
 * It masks a non numeric value
 * @param value - the value to be masked
 * @param bestMask - the mask that best fits the value
 * @param setForceReset - it forces the input cursor to be reset
 * @param isGuided - if should add a guide to the mask
 * @returns - the masked value
 *
 * @example
 * "033652000001" -> "033.652.000-001"
 *
 * if guided:
 * "0232" -> "023.2__.___-___"
 * if not:
 * "0232" -> "023.2"
 */

function getNonNumericMask(
  value: string | number,
  bestMask: string,
  setForceReset?: React.Dispatch<React.SetStateAction<boolean>>,
  isGuided?: boolean
) {
  let newMask = "";

  const valueChars = value.toString().split("");

  // now masks the value
  if (isGuided) {
    newMask = nonNumericGuided(bestMask, valueChars, setForceReset);
  } else {
    newMask = nonNumericDefault(bestMask, valueChars);
  }

  return newMask;
}

export default getNonNumericMask;
