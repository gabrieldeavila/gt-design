import { useCallback } from "react";
import { IOptionsValidation } from "./interface";

function useInputValidation() {
  const optionsValidation = useCallback(
    (
      validations: string[],
      options: IOptionsValidation,
      value: string,
      type: string
    ) => {
      let isValid = true;
      let invalidMessage = "";

      validations.every((validation) => {
        if (!options[validation]?.regex?.test?.(value)) {
          try {
            invalidMessage = options[validation].message;
            isValid = false;

            return false;
          } catch {
            throw new Error(
              `Oops, ${validation} is not a valid validation for a ${type} input!`
            );
          }
        }

        return true;
      });
      return { isValid, invalidMessage };
    },
    []
  );

  return { optionsValidation };
}

export default useInputValidation;
