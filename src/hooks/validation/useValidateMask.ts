import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /.+/,
    message: "REQUIRED",
  },
};

function useValidateMask() {
  const { optionsValidation } = useInputValidation();

  const validateMask = useCallback(
    (value: string, validations: string[]) => {
      console.log(value);

      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "number"
      );

      return { isValid, invalidMessage, errorsVar: {} };
    },
    [optionsValidation]
  );

  return { validateMask };
}

export default useValidateMask;
