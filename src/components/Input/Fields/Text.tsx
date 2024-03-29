/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import useGTTranslate from "../../../gt/Global/translate";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import useValidateText from "../../../hooks/validation/useValidateText";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputText } from "./interface";
import RequiredMessage from "../Extras/RequiredMessage";

const defaultValidationObj = ["required", "noInitialSpace", "noEndingSpaces"];
function GTInputText({
  disableClearable,
  name,
  label,
  validations = defaultValidationObj,
  defaultValidation = true,
  minWords,
  maxWords,
  minChars,
  maxChars,
  onChange,
  disabled,
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
  customType = "text",
  customField,
}: IGTInputText) {
  const { translateThis } = useGTTranslate();

  const uniqueName = useUniqueName({ name });
  const alterFieldRef = useRef<boolean>(true);

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
    value,
    isLabelUp,
    isValidatingOnBlur,
    showFeedback,
    handleInputChange,
    handleInputBlur,
    handleInputBlurErrors,
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

  const { validateText, validateMinAndMax } = useValidateText(
    minWords,
    maxWords,
    minChars,
    maxChars
  );

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateText(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const { isValid, invalidMessage } = validateText(iVal, inputValidations);
      const { isAllValid, invalidAllMessage, errorsVars } = validateMinAndMax(
        invalidMessage,
        isValid,
        iVal
      );

      handleInputChange(iVal, isAllValid, invalidAllMessage, errorsVars);

      onChange?.(e, name)?.catch((err) => {
        console.error(err);
      });
    },
    [
      onChange,
      name,
      validateText,
      inputValidations,
      validateMinAndMax,
      handleInputChange,
    ]
  );

  const handleBlur = useCallback(() => {
    handleInputBlur();

    if (alterFieldRef.current) {
      handleInputBlurErrors().catch((e) => console.error(e));
    }

    alterFieldRef.current = false;
  }, [handleInputBlur, handleInputBlurErrors]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContextSetters();

  const isShowingClearBtn = useMemo(
    () =>
      !_.isEmpty(value) &&
      !(disableClearable ?? false) &&
      showFeedback &&
      !(disabled ?? false),
    [disableClearable, disabled, showFeedback, value]
  );

  const isLoadingIcon = useMemo(
    () => isValidatingOnBlur && showFeedback,
    [isValidatingOnBlur, showFeedback]
  );

  const inputField = useMemo(
    () =>
      customField != null ? (
        React.createElement(customField.type, {
          ...customField.props,
          value,
          onChange: handleChange,
          disabled,
          onBlur: handleBlur,
          onFocus: handleInputFocus,
          isLabel: isLabelUp,
          id: uniqueName,
          name: uniqueName,
          isShowingSomething: isLoadingIcon || isShowingClearBtn,
        })
      ) : (
        <Input.Field
          type={customType}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={handleInputFocus}
          id={uniqueName}
          name={uniqueName}
        />
      ),
    [
      customField,
      customType,
      disabled,
      handleBlur,
      handleChange,
      handleInputFocus,
      isLabelUp,
      isLoadingIcon,
      isShowingClearBtn,
      uniqueName,
      value,
    ]
  );

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        row={row}
        isWrong={!isValid}
        disabled={disabled}
        ref={containerRef}
      >
        <Input.FieldWrapper>
          <Input.Label
            isRequired={isRequired}
            isWrong={!isValid}
            up={isLabelUp}
            htmlFor={uniqueName}
          >
            {translateThis(label)}
            <RequiredMessage isRequired={isRequired} />
          </Input.Label>

          {inputField}
        </Input.FieldWrapper>

        <ErrorMessage
          message={errorMessage}
          params={localeErrorsParams}
          isWrong={!isValid}
        />

        <Input.FeedbackWrapper>
          {isLoadingIcon && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}

          {isShowingClearBtn && (
            <Input.IconWrapper onClick={handleInputClear}>
              <Icon.X size={15} className="svg-no-active cursor" />
            </Input.IconWrapper>
          )}

          {_.isEmpty(errorMessage) && (
            <GTTooltip parentRef={containerRef} title={title} text={text} />
          )}
        </Input.FeedbackWrapper>
      </Input.Container>
    </>
  );
}

export default GTInputText;

GTInputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  minWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValidation: PropTypes.bool,
  minChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
