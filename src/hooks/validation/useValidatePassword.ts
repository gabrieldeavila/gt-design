import { useCallback } from "react";
import { useGTPageStateContext } from "../../context/pageState";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /.+/,
    message: "REQUIRED",
  },
  eightLong: {
    regex: /^.{8,}$/,
    message: "EIGHT_LONG",
  },
  oneNumber: {
    regex: /\d/,
    message: "ONE_NUMBER",
  },
  oneSpecial: {
    regex: /[@$!%*?&]/,
    message: "ONE_SPECIAL",
  },
  oneUppercase: {
    regex: /[A-Z]/,
    message: "ONE_UPPERCASE",
  },
  oneLowercase: {
    regex: /[a-z]/,
    message: "ONE_LOWERCASE",
  },
};

function useValidatePassword() {
  const { optionsValidation } = useInputValidation();
  const { pageState } = useGTPageStateContext();

  const validatePassword = useCallback(
    (value: string, validations: string[], sameAs?: string) => {
      let { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "password"
      );

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (sameAs && isValid) {
        isValid = value === pageState[sameAs];

        invalidMessage = isValid ? "" : "PASSWORDS_NOT_MATCH";
      }

      return { isValid, invalidMessage };
    },
    [optionsValidation, pageState]
  );

  return { validatePassword };
}

export default useValidatePassword;
