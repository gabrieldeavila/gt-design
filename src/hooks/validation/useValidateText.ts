/* eslint-disable operator-linebreak */
import _ from "lodash";
import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /^.{1,}$/,
    message: "REQUIRED",
  },
  noInitialSpace: {
    regex: /^[^\s]/,
    message: "NO_INITIAL_SPACE",
  },
  noEndingSpaces: {
    regex: /[^\s]$/,
    message: "NO_TRAILING_SPACE",
  },
  noSpaces: {
    regex: /^[^\s]+$/,
    message: "NO_SPACES",
  },
  userName: {
    regex: /^[a-zA-Z0-9]+$/,
    message: "USERNAME",
  },
};

function useValidateText(
  minWords: number | string,
  maxWords: number | string,
  minChars: number | string,
  maxChars: number | string
) {
  const { optionsValidation } = useInputValidation();

  const validateText = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "text"
      );

      return { isValid, invalidMessage };
    },
    [optionsValidation]
  );

  const validateMinAndMaxWords = useCallback(
    (invalidMessage: string, isValid: boolean, value: string) => {
      // if maxWords is not bigger than minWords, then it is not a valid range
      const shouldValidateWords = maxWords > minWords;

      // and if the value is already not valid, then we don't need to search for errors
      if (!shouldValidateWords || !isValid) {
        return {
          isAllValidWords: isValid,
          invalidAllMessageWords: invalidMessage,
        };
      }

      // get words from a string, more than one space is considered as one space
      const words = value.trim().split(/\s+/);

      const isAllValidWords =
        isValid && words.length >= minWords && words.length <= maxWords;

      // isInvalidWords is true, then it will have a message
      const isInvalidMessage =
        !isAllValidWords &&
        `This field must have between ${minWords} and ${maxWords} words.`;

      const invalidAllMessageWords = isInvalidMessage;

      return { isAllValidWords, invalidAllMessageWords };
    },
    [maxWords, minWords]
  );

  const validateMinAndMaxChars = useCallback(
    (invalidMessage: string | boolean, isValid: boolean, value: string) => {
      // always makes sure that maxChars and minChars are numbers
      const maxCharsNumber = Number(maxChars);
      const minCharsNumber = Number(minChars);

      // if maxChars is not bigger than minChars, then it is not a valid range
      const shouldValidateChars = maxCharsNumber > minCharsNumber;

      // and if the value is already not valid, then we don't need to search for errors
      if (!shouldValidateChars || !isValid) {
        return {
          isAllValidChars: isValid,
          invalidAllMessageChars: invalidMessage,
        };
      }

      const isAllValidChars =
        isValid &&
        value.length >= minCharsNumber &&
        value.length <= maxCharsNumber;

      const currChars = value.length;

      // if isInvalidChars is true, then it will have a message
      const isInvalidMessage =
        !isAllValidChars &&
        `This field must have between ${minCharsNumber} and ${maxCharsNumber} characters. You have ${currChars} characters.`;
      const invalidAllMessageChars = isInvalidMessage;

      return { isAllValidChars, invalidAllMessageChars };
    },
    [maxChars, minChars]
  );

  const validateMinAndMax = useCallback(
    (invalidMessage: string, isValid: boolean, value: string) => {
      const { isAllValidWords, invalidAllMessageWords } =
        validateMinAndMaxWords(invalidMessage, isValid, value);

      const { isAllValidChars, invalidAllMessageChars } =
        validateMinAndMaxChars(invalidAllMessageWords, isAllValidWords, value);

      let msg = "";

      if(!_.isBoolean(invalidAllMessageChars)) {
        msg = invalidAllMessageChars;
      }

      return {
        isAllValid: isAllValidChars,
        invalidAllMessage: msg,
      };
    },
    [validateMinAndMaxWords, validateMinAndMaxChars]
  );

  return { validateText, validateMinAndMax, validateMinAndMaxWords };
}

export default useValidateText;
