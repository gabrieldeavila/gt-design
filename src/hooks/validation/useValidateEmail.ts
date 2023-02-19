import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /^.{1,}$/,
    message: "REQUIRED",
  },
  email: {
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "EMAIL",
  },
};

function useValidateEmail() {
  const { optionsValidation } = useInputValidation();

  const validateEmail = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "email"
      );

      return { isValid, invalidMessage };
    },
    [optionsValidation]
  );

  return { validateEmail };
}

export default useValidateEmail;
