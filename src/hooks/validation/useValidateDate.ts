/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable operator-linebreak */
import { addDays, format } from "date-fns";
import { useCallback } from "react";
import useDateFormat from "../helpers/useDateFormat";
import useInputValidation from "./useInputValidation";

const options = {
  required: {
    regex: /^.{1,}$/,
    message: "REQUIRED",
  },
};

function useValidateDate(min?: string | number, max?: string | number) {
  const { optionsValidation } = useInputValidation();
  const dateFormat = useDateFormat() ?? "";

  // use the user date format to format the error message
  const formatErrorData = useCallback(
    (date: string | number) => {
      const dateErr = new Date(date);

      const preventDayRemoval = addDays(dateErr, 1);

      const dateFormatted = format(preventDayRemoval, dateFormat);

      return dateFormatted;
    },
    [dateFormat]
  );

  const validateMinAndMax = useCallback(
    (value: string) => {
      const time = new Date(value).getTime();
      let isValid = true;
      let invalidMessage = "";
      let errorsVars = {};

      if (min) {
        const minVal = new Date(min).getTime();
        if (time < minVal) {
          const MIN = formatErrorData(min);

          isValid = false;
          invalidMessage = "MIN_DATE";
          errorsVars = { MIN };
        }
      }

      if (max) {
        const maxVal = new Date(max).getTime();
        if (time > maxVal) {
          const MAX = formatErrorData(max);

          isValid = false;
          invalidMessage = "MAX_DATE";
          errorsVars = { MAX };
        }
      }

      return { isValid, invalidMessage, errorsVars };
    },
    [formatErrorData, max, min]
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
