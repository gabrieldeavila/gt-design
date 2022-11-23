import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "REQUIRED",
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
