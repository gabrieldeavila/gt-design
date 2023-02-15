/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import _ from "lodash";
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useMask from "../../../hooks/pageState/useMask";
import useValidateMask from "../../../hooks/validation/useValidateMask";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputMask } from "./interface";

const defaultValidationObj = ["required"];
function GTInputMask({
  name,
  label,
  validations,
  defaultValidation,
  onChange,
  onChangeValidate,
  text,
  title,
  row,
  mask,
  onBlurValidate,
  isGuided,
}: IGTInputMask) {
  const { t } = useTranslation();

  const { isLoading } = useGTPageStateContextSetters();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const {
    isLabelUp,
    value,
    isValidatingOnBlur,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleInputClear,
  } = useInputValues(
    name,
    validateState,
    setIsValid,
    setErrorMessage,
    setLocaleErrorsParams,
    onBlurValidate,
    onChangeValidate,
    inputValidations
  );

  const inpRef = useRef<HTMLInputElement>(null);
  const isFirstChange = useRef<boolean>(true);

  const { maskedValue, unMask } = useMask(
    value,
    mask,
    inpRef,
    isFirstChange.current,
    isGuided
  );

  const { validateMask } = useValidateMask(mask);

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateMask(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currKey = useRef<string>("");

  useEffect(() => {
    if (inpRef.current == null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // gets the key pressed
      currKey.current = e.key;
    };

    const inpt = inpRef.current;

    // add event listener to the input
    inpt.addEventListener("keydown", handleKeyDown);

    return () => {
      inpt?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: iVal } = e.target;

      const unMaskedVal = unMask(iVal, currKey.current);

      const { isValid, invalidMessage, errorsVar } = validateMask(
        unMaskedVal.toString(),
        inputValidations
      );
      isFirstChange.current = false;

      handleInputChange(unMaskedVal, isValid, invalidMessage, errorsVar);

      onChange?.(e);
    },
    [unMask, validateMask, inputValidations, handleInputChange, onChange]
  );

  const handleMaskClear = useCallback(async () => {
    isFirstChange.current = true;

    await handleInputClear();
  }, [handleInputClear]);

  const containerRef = useRef<HTMLDivElement>(null);

  const isUp = useMemo(() => {
    if (isGuided) return true;

    return isLabelUp;
  }, [isGuided, isLabelUp]);

  const handleFocus = useCallback(() => {
    handleInputFocus();

    // adds the cursor to the beginning of the input
    setTimeout(() => {
      if (inpRef.current == null) return;

      inpRef.current.selectionStart = 0;
    }, 0);
  }, [handleInputFocus]);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container isWrong={!isValid} row={row}>
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValid} up={isUp} htmlFor={name}>
            {t(label)}
          </Input.Label>
          <Input.Field
            ref={inpRef}
            type="text"
            value={maskedValue}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleFocus}
            id={name}
            name={name}
            autoComplete="off"
          />
        </Input.FieldWrapper>

        {!isValid && (
          <Input.Error>{t(errorMessage, localeErrorsParams)}</Input.Error>
        )}

        <Input.FeedbackWrapper>
          {(title != null || text != null) && (
            <Input.IconWrapper ref={containerRef}>
              <Icon.Info size={15} className="svg-no-active" />
            </Input.IconWrapper>
          )}

          {isValidatingOnBlur && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}

          {(!_.isEmpty(value) || value > 0) && (
            <Input.IconWrapper onClick={handleMaskClear}>
              <Icon.X size={15} className="svg-no-active cursor" />
            </Input.IconWrapper>
          )}
        </Input.FeedbackWrapper>
      </Input.Container>

      {(title != null || text != null) && (
        <GTTooltip parentRef={containerRef} title={title} text={text} />
      )}
    </>
  );
}

export default GTInputMask;

GTInputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputMask.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  defaultValidation: true,
};
