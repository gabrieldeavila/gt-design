/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback } from "react";
import { TNumericOptions } from "../../components/Input/Fields/interface";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /.+/,
    message: "REQUIRED",
  },
};

function useValidateMask(mask: TNumericOptions) {
  const { optionsValidation } = useInputValidation();

  const validateMask = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "number"
      );

      if (mask.type === "numeric_mask") {
        // check if the value is greater than the max value, if it has one
        if ((mask.max ?? false) && Number(value) > Number(mask.max)) {
          return {
            isValid: false,
            invalidMessage: "MAX",
            errorsVar: { MAX: mask.max },
          };
        } else if ((mask.min ?? false) && Number(value) < Number(mask.min)) {
          return {
            isValid: false,
            invalidMessage: "MIN",
            errorsVar: { MIN: mask.min },
          };
        }
      }

      return { isValid, invalidMessage, errorsVar: {} };
    },
    [mask, optionsValidation]
  );

  return { validateMask };
}

export default useValidateMask;
