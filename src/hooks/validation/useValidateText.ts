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
  minWords?: number | string,
  maxWords?: number | string,
  minChars?: number | string,
  maxChars?: number | string
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
      const prevValues = {
        isAllValidWords: isValid,
        invalidAllMessageWords: invalidMessage,
        errorsVarsWords: {},
      };

      // if is maxWords and minWords are not defined, return the current state
      if (!maxWords || !minWords) {
        return prevValues;
      }

      // if maxWords is not bigger than minWords, then it is not a valid range
      const shouldValidateWords = maxWords > minWords;

      // and if the value is already not valid, then we don't need to search for errors
      if (!shouldValidateWords || !isValid) {
        return prevValues;
      }

      // get words from a string, more than one space is considered as one space
      const words = value.trim().split(/\s+/);

      const isAllValidWords =
        isValid && words.length >= minWords && words.length <= maxWords;

      // isInvalidWords is true, then it will have a message
      const isInvalidMessage = !isAllValidWords && "MAX_WORDS_BETWEEN";

      const errorsVarsWords = { MAX: maxWords, MIN: minWords };

      const invalidAllMessageWords = isInvalidMessage;

      return { isAllValidWords, invalidAllMessageWords, errorsVarsWords };
    },
    [maxWords, minWords]
  );

  const validateMinAndMaxChars = useCallback(
    (
      invalidMessage: string | boolean,
      isValid: boolean,
      value: string
    ) => {
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
      const isInvalidMessage = !isAllValidChars && "MAX_CHARS";

      const errorsVarsChars = {
        MAX: maxCharsNumber,
        MIN: minCharsNumber,
        CURR: currChars,
      };

      const invalidAllMessageChars = isInvalidMessage;

      return { isAllValidChars, invalidAllMessageChars, errorsVarsChars };
    },
    [maxChars, minChars]
  );

  const validateMinAndMax = useCallback(
    (invalidMessage: string, isValid: boolean, value: string) => {
      const { isAllValidWords, invalidAllMessageWords, errorsVarsWords } =
        validateMinAndMaxWords(invalidMessage, isValid, value);

      const { isAllValidChars, invalidAllMessageChars, errorsVarsChars } =
        validateMinAndMaxChars(invalidAllMessageWords, isAllValidWords, value);

      let msg = "";

      if (!_.isBoolean(invalidAllMessageChars)) {
        msg = invalidAllMessageChars || "";
      }

      const errorsVars = errorsVarsChars || errorsVarsWords;

      return {
        isAllValid: isAllValidChars,
        invalidAllMessage: msg,
        errorsVars,
      };
    },
    [validateMinAndMaxWords, validateMinAndMaxChars]
  );

  return { validateText, validateMinAndMax, validateMinAndMaxWords };
}

export default useValidateText;
