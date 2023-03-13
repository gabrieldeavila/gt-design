/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable operator-linebreak */
import { useCallback } from "react";
import useInputValidation from "./useInputValidation";
import { format, parseISO } from "date-fns";

const options = {
  required: {
    regex: /^.{1,}$/,
    message: "REQUIRED",
  },
};

const formatDate = (dateString: string) => {
  const dateObj = parseISO(dateString);
  const formattedDate = format(dateObj, "dd/MM/yyyy");

  return formattedDate;
};

function useValidateDate(min?: string | number, max?: string | number) {
  const { optionsValidation } = useInputValidation();

  const validateMinAndMax = useCallback(
    (value: string) => {
      const time = new Date(value).getTime();
      let isValid = true;
      let invalidMessage = "";
      let errorsVars = {};

      if (min) {
        const minVal = new Date(min).getTime();
        if (time < minVal) {
          isValid = false;
          invalidMessage = "MIN_DATE";
          errorsVars = { MIN: formatDate(min.toString()) };
        }
      }

      if (max) {
        const maxVal = new Date(max).getTime();
        if (time > maxVal) {
          isValid = false;
          invalidMessage = "MAX_DATE";
          errorsVars = { MAX: formatDate(max.toString()) };
        }
      }

      return { isValid, invalidMessage, errorsVars };
    },
    [max, min]
  );

  const validateDate = useCallback(
    (value: string, validations: string[]) => {
      const { isValid, invalidMessage } = optionsValidation(
        validations,
        options,
        value,
        "date"
      );

      const errorsVars = {};

      if (isValid && (min ?? max)) {
        return validateMinAndMax(value);
      }

      return { isValid, invalidMessage, errorsVars };
    },
    [max, min, optionsValidation, validateMinAndMax]
  );

  return { validateDate };
}

export default useValidateDate;
