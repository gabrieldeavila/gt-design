/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useRef, useState } from "react";
import {
  TBlurValidate,
  TChangeValidate,
} from "../../components/Input/Fields/interface";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "../validation/interface";
import { THandleBlurErrors, THandleInputChange } from "./interface";

function useInputValues(
  name: string,
  validateState: TValidateState,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setLocaleErrorsParams: React.Dispatch<React.SetStateAction<Object>>,
  onBlurValidate?: TBlurValidate,
  onChangeValidate?: TChangeValidate
) {
  const alterFieldRef = useRef<boolean>(true);

  const { pageStateRef } = useGTPageStateContextSetters();
  // it only validates on blur if the other validations are valid
  const isInputValid = useRef<boolean>(true);

  const [value, setValue] = useState(pageStateRef?.current?.[name] ?? "");
  const [labelIsUp, setLabelIsUp] = useState(!!pageStateRef?.current?.[name]);
  const [isValidatingOnBlur, setIsValidatingOnBlur] = useState(false);

  const handleInputFocus = useCallback(() => {
    setLabelIsUp(true);
  }, []);

  const handleValidateOnChange: THandleInputChange = useCallback(
    (newValue, isValid, invalidMessage, errorsVar) => {
      let isValidTemp = isValid;
      let invalidMessageTemp = invalidMessage;
      let errorsTemp = errorsVar;

      if (onChangeValidate && isValid) {
        const [isValidChange, invalidMessageChange, errorsParams] =
          onChangeValidate(newValue);

        isValidTemp = isValidChange;
        errorsTemp = errorsParams ?? {};
        invalidMessageTemp = invalidMessageChange;
      }

      isInputValid.current = isValidTemp;
      setIsValid(isValidTemp);
      setErrorMessage(invalidMessageTemp ?? "");
      setLocaleErrorsParams(errorsTemp ?? {});
    },
    [onChangeValidate, setErrorMessage, setIsValid, setLocaleErrorsParams]
  );

  // if has value, label is up
  const handleInputChange: THandleInputChange = useCallback(
    (newVal: string | number, isValid, invalidMessage, errorsVar) => {
      if (!_.isEmpty(newVal) && _.isEmpty(value)) {
        setLabelIsUp(true);
      }
      setValue(newVal);

      alterFieldRef.current = true;

      handleValidateOnChange(newVal, isValid, invalidMessage, errorsVar);
    },
    [handleValidateOnChange, value]
  );

  const handleInputBlurErrors: THandleBlurErrors = useCallback(async () => {
    if (!onBlurValidate || !isInputValid.current) return;

    // if there is any error, don't validate the mask
    setIsValidatingOnBlur(true);

    const [isValid, errorMessage = "", errorsParams] =
      (await onBlurValidate(value)) ?? [];

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
    setIsValid,
    setLocaleErrorsParams,
    validateState,
    value,
  ]);

  const handleInputBlur = useCallback(() => {
    if (_.isEmpty(value)) {
      setLabelIsUp(false);
    }

    if (alterFieldRef.current) {
      handleInputBlurErrors().catch((e) => console.error(e));
      alterFieldRef.current = false;
    }
  }, [handleInputBlurErrors, value]);

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
