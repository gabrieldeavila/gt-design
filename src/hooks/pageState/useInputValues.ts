/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useState } from "react";
import {
  TBlurValidate,
  TChangeValidate,
} from "../../components/Input/Fields/interface";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "../validation/interface";
import { THandleBlurErrors } from "./interface";

function useInputValues(
  name: string,
  validateState: TValidateState,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setLocaleErrorsParams: React.Dispatch<React.SetStateAction<Object>>,
  onBlurValidate?: TBlurValidate,
  onChangeValidate?: TChangeValidate
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

  const handleValidateOnChange = useCallback(
    (value: string | number) => {
      if (!onChangeValidate) return;

      const [isValid, invalidMessage, errorsParams] = onChangeValidate(value);

      if (isValid == null) return;

      setIsValid(isValid);
      setErrorMessage(invalidMessage);
      setLocaleErrorsParams(errorsParams ?? {});
    },
    [onChangeValidate, setErrorMessage, setIsValid, setLocaleErrorsParams]
  );

  // if has value, label is up
  const handleInputChange = useCallback(
    (val: string | number) => {
      if (!_.isEmpty(val) && _.isEmpty(value)) {
        setLabelIsUp(true);
      }
      setValue(val);

      handleValidateOnChange(val);
    },
    [handleValidateOnChange, value]
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

    const [isValid, errorMessage = "", errorsParams] =
      (await onBlurValidate?.(value)) ?? [];

    if (isValid != null) {
      validateState(isValid, value);
      setIsValidatingOnBlur(false);

      setIsValid(isValid);
      setErrorMessage(errorMessage);
      setLocaleErrorsParams(errorsParams ?? {});
    }

    setIsValidatingOnBlur(false);
  }, [
    onBlurValidate,
    setErrorMessage,
    setErrors,
    setIsValid,
    setLocaleErrorsParams,
    validateState,
    value,
  ]);

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
