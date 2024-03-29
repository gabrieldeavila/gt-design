/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  TBlurValidate,
  TChangeValidate,
} from "../../components/Input/Fields/interface";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "../validation/interface";
import useInitialErrors from "../validation/useInitialErrors";
import { THandleBlurErrors, THandleInputChange } from "./interface";

const checkToBoolean = (value: string | number | boolean) => {
  // checks if the value is a boolean
  if (typeof value === "boolean") {
    return value.toString();
  }

  return value;
};

function useInputValues(
  name: string,
  validateState: TValidateState,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setLocaleErrorsParams: React.Dispatch<React.SetStateAction<Object>>,
  onBlurValidate?: TBlurValidate,
  onChangeValidate?: TChangeValidate,
  inputValidations?: string[],
  disabled?: boolean
) {
  const alterFieldRef = useRef<boolean>(true);

  const [showFeedback, setShowFeedback] = useState(false);

  const { pageStateRef } = useGTPageStateContextSetters();
  const { handleInitialErrors } = useInitialErrors({ name, inputValidations });

  // it only validates on blur if the other validations are valid
  const isInputValid = useRef<boolean>(true);

  const [value, setValue] = useState(
    checkToBoolean(pageStateRef?.current?.[name] ?? "")
  );
  const [isLabelUp, setIsLabelUp] = useState(!!pageStateRef?.current?.[name]);
  const [isValidatingOnBlur, setIsValidatingOnBlur] = useState(false);

  const isRequired = useMemo(
    () => inputValidations?.includes("required") && _.isEmpty(value.toString()),
    [inputValidations, value]
  );

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, avoidTimeOut?: boolean) => {
      // adds the selection range to the input
      // if it's type is number, first changes to string

      setTimeout(() => {
        if (avoidTimeOut ?? false) return;

        // changes the input type to text
        let isInvalid: boolean | string = false;

        if (e.target.type !== "text") {
          isInvalid = e.target.type;
          e.target.type = "text";
        }
        e.target.setSelectionRange(0, e.target.value.length);

        // returns to the original type
        if (isInvalid) e.target.type = isInvalid;
      });
      setIsLabelUp(true);
    },
    []
  );

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
      validateState(isValidTemp, newValue);

      isInputValid.current = isValidTemp;
      setIsValid(isValidTemp);
      setErrorMessage(invalidMessageTemp ?? "");
      setLocaleErrorsParams(errorsTemp ?? {});
    },
    [
      onChangeValidate,
      setErrorMessage,
      setIsValid,
      setLocaleErrorsParams,
      validateState,
    ]
  );

  const handleInputChange: THandleInputChange = useCallback(
    (newVal, isValid, invalidMessage, errorsVar) => {
      if (disabled ?? false) return;

      const valueTemp = value.toString();
      const newValTemp = newVal.toString();

      // if it has value, label is up
      if (!_.isEmpty(newValTemp) && _.isEmpty(valueTemp)) {
        setIsLabelUp(true);
      }
      setValue(newVal);

      alterFieldRef.current = true;

      handleValidateOnChange(newVal, isValid, invalidMessage, errorsVar);
    },
    [disabled, handleValidateOnChange, value]
  );

  const handleInputBlurErrors: THandleBlurErrors = useCallback(async () => {
    if (!onBlurValidate || !isInputValid.current) return;

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
    let isEmpty = false;

    if (_.isEmpty(value.toString())) {
      setIsLabelUp(false);

      isEmpty = true;
      setIsValid(false);
      setErrorMessage("REQUIRED");
    }

    if (alterFieldRef.current && !isEmpty) {
      handleInputBlurErrors().catch((e) => console.error(e));
      alterFieldRef.current = false;
    }
  }, [handleInputBlurErrors, setErrorMessage, setIsValid, value]);

  const handleInputClear = useCallback(async () => {
    const newValue = "";
    const isValid = await handleInitialErrors(newValue);
    validateState(isValid, newValue);

    setValue("");
    setIsLabelUp(false);

    if (isValid) {
      setIsValid(true);
      setErrorMessage("");
      setLocaleErrorsParams({});
    } else {
      setIsValid(false);
      setErrorMessage("REQUIRED");
    }
  }, [
    handleInitialErrors,
    setErrorMessage,
    setIsValid,
    setLocaleErrorsParams,
    validateState,
  ]);

  const handleMouseEnter = useCallback(() => {
    setShowFeedback(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowFeedback(false);
  }, []);

  return {
    value,
    isValidatingOnBlur,
    isRequired,
    isLabelUp,
    showFeedback,
    setValue,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleInputClear,
    handleInputBlurErrors,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export default useInputValues;
