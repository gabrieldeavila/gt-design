/* eslint-disable @typescript-eslint/indent */
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
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useMask from "../../../hooks/pageState/useMask";
import useValidateMask from "../../../hooks/validation/useValidateMask";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputMask } from "./interface";

const defaultValidationObj = ["required"];
function GTInputMask({
  disabled,
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
  const uniqueName = useUniqueName({ name });

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
    isRequired,
    isLabelUp,
    value,
    isValidatingOnBlur,
    showFeedback,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleInputClear,
    handleMouseEnter,
    handleMouseLeave,
  } = useInputValues(
    name,
    validateState,
    setIsValid,
    setErrorMessage,
    setLocaleErrorsParams,
    onBlurValidate,
    onChangeValidate,
    inputValidations,
    disabled
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

    const { isValid, invalidMessage, errorsVar } = validateMask(
      chars,
      inputValidations
    );

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    setLocaleErrorsParams(errorsVar);
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

  const handleFocus = useCallback(() => {
    handleInputFocus();

    // adds the cursor to the beginning of the input
    setTimeout(() => {
      if (inpRef.current == null) return;

      inpRef.current.selectionStart = 0;
      inpRef.current.selectionEnd = maskedValue.toString()?.length ?? 0;
    }, 0);
  }, [handleInputFocus, maskedValue]);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isWrong={!isValid}
        disabled={disabled}
        row={row}
        ref={containerRef}
      >
        <Input.FieldWrapper>
          <Input.Label
            isRequired={isRequired}
            isWrong={!isValid}
            up={isLabelUp}
            htmlFor={uniqueName}
          >
            {t(label)}
          </Input.Label>
          <Input.Field
            ref={inpRef}
            type="text"
            disabled={disabled}
            value={maskedValue}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleFocus}
            id={uniqueName}
            name={uniqueName}
            autoComplete="off"
          />
        </Input.FieldWrapper>

        <ErrorMessage
          message={errorMessage}
          params={localeErrorsParams}
          isWrong={!isValid}
        />

        <Input.FeedbackWrapper>
          {isValidatingOnBlur && showFeedback && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}

          {(!_.isEmpty(value) || value > 0) &&
            !(disabled ?? false) &&
            showFeedback && (
              <Input.IconWrapper onClick={handleMaskClear}>
                <Icon.X size={15} className="svg-no-active cursor" />
              </Input.IconWrapper>
            )}
        </Input.FeedbackWrapper>
        {_.isEmpty(errorMessage) && (
          <GTTooltip parentRef={containerRef} title={title} text={text} />
        )}
      </Input.Container>
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
