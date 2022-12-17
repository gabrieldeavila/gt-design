import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /.+/,
    message: "REQUIRED",
  },
};

function useValidateNumber(min?: number | string, max?: number | string) {
  const { optionsValidation } = useInputValidation();

  const validateNumber = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "number"
      );

      if (min != null && value < min) {
        return {
          isValid: false,
          invalidMessage: "MIN",
          errorsVar: { MIN: min },
        };
      }

      if (max != null && value > max) {
        return {
          isValid: false,
          invalidMessage: "MAX",
          errorsVar: { MAX: max },
        };
      }
      return { isValid, invalidMessage, errorsVar: {} };
    },
    [max, min, optionsValidation]
  );

  return { validateNumber };
}

export default useValidateNumber;
