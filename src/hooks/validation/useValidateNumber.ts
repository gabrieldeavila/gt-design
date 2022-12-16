import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /.+/,
    message: "REQUIRED",
  },
};

function useValidateNumber() {
  const { optionsValidation } = useInputValidation();

  const validateNumber = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "number"
      );

      return { isValid, invalidMessage };
    },
    [optionsValidation]
  );

  return { validateNumber };
}

export default useValidateNumber;
