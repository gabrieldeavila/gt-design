/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable operator-linebreak */
import { useCallback } from "react";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /^.{1,}$/,
    message: "REQUIRED",
  },
};

function useValidateSelect() {
  const { optionsValidation } = useInputValidation();

  const validateSelect = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "select"
      );

      return { isValid, invalidMessage };
    },
    [optionsValidation]
  );

  return { validateSelect };
}

export default useValidateSelect;
