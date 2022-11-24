import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
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

  const validatePassword = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "password"
      );

      return { isValid, invalidMessage };
    },
    [optionsValidation]
  );

  return { validatePassword };
}

export default useValidatePassword;
