import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  eightLong: {
    regex: /^.{8,}$/,
    message: "Password must be at least 8 characters long.",
  },
  oneNumber: {
    regex: /\d/,
    message: "Password must contain at least one number.",
  },
  oneSpecial: {
    regex: /[@$!%*?&]/,
    message: "Password must contain at least one special character.",
  },
  oneUppercase: {
    regex: /[A-Z]/,
    message: "Password must contain at least one uppercase letter.",
  },
  oneLowercase: {
    regex: /[a-z]/,
    message: "Password must contain at least one lowercase letter.",
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
