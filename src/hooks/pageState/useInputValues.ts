/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useState } from "react";
import { TBlurValidate } from "../../components/Input/Fields/interface";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "../validation/interface";
import { THandleBlurErrors } from "./interface";

function useInputValues(
  name: string,
  validateState: TValidateState,
  onBlurValidate?: TBlurValidate
) {
  const { pageStateRef, setErrors } = useGTPageStateContextSetters();

  const [value, setValue] = useState(pageStateRef?.current?.[name] ?? "");
  const [labelIsUp, setLabelIsUp] = useState(!!pageStateRef?.current?.[name]);
  const [isValidatingOnBlur, setIsValidatingOnBlur] = useState(false);

  const handleInputFocus = useCallback(() => {
    setLabelIsUp(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (_.isEmpty(value)) {
      setLabelIsUp(false);
    }
  }, [value]);

  // if has value, label is up
  const handleInputChange = useCallback(
    (val: string) => {
      if (!_.isEmpty(val) && _.isEmpty(value)) {
        setLabelIsUp(true);
      }
      setValue(val);
    },
    [value]
  );

  const handleInputBlurErrors: THandleBlurErrors = useCallback(async () => {
    let errors = 0;

    await setErrors((prev) => {
      errors = prev.length;
      return prev;
    });

    // if there is any error, don't validate the mask
    if (errors > 0) return;

    setIsValidatingOnBlur(true);

    const [isValid, errorMessage = ""] = (await onBlurValidate?.(value)) ?? [];
    if (isValid == null) return;

    validateState(isValid, value);
    setIsValidatingOnBlur(false);

    return [isValid, errorMessage];
  }, [onBlurValidate, setErrors, validateState, value]);

  return {
    value,
    isValidatingOnBlur,
    labelIsUp,
    setValue,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleInputBlurErrors,
  };
}

export default useInputValues;
