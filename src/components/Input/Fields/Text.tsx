/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
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
import useValidateState from "../../../hooks/validation/useValidateState";
import useValidateText from "../../../hooks/validation/useValidateText";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputText } from "./interface";

const defaultValidationObj = ["required", "noInitialSpace", "noEndingSpaces"];
function GTInputText({
  name,
  label,
  validations,
  defaultValidation,
  minWords,
  maxWords,
  minChars,
  maxChars,
  onChange,
  text,
  title,
  row,
  onBlurValidate,
}: IGTInputText) {
  const { t } = useTranslation();
  const alterFieldRef = useRef<boolean>(true);

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const {
    value,
    isValidatingOnBlur,
    labelIsUp,
    handleInputChange,
    handleInputBlur,
    handleInputBlurErrors,
    handleInputFocus,
  } = useInputValues(name, validateState, onBlurValidate);

  const { validateText, validateMinAndMax } = useValidateText(
    minWords,
    maxWords,
    minChars,
    maxChars
  );
  const [isValidText, setIsValidText] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateText(chars, inputValidations);

    setIsValidText(isValid);
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

      validateState(isAllValid, iVal);
      setErrorMessage(invalidAllMessage);
      setIsValidText(isAllValid);
      setLocaleErrorsParams(errorsVars);
      handleInputChange(iVal);
      alterFieldRef.current = true;

      onChange(e);
    },
    [
      onChange,
      validateText,
      inputValidations,
      validateMinAndMax,
      validateState,
      handleInputChange,
    ]
  );

  const handleTextBlurErrors = useCallback(async () => {
    const [isValid, errorMessage = ""] = (await handleInputBlurErrors()) ?? [];

    if (isValid == null) {
      return;
    }

    setIsValidText(isValid);
    setErrorMessage(errorMessage);
  }, [handleInputBlurErrors]);

  const handleBlur = useCallback(() => {
    handleInputBlur();

    if (alterFieldRef.current) {
      handleTextBlurErrors().catch((e) => console.error(e));
    }

    alterFieldRef.current = false;
  }, [handleInputBlur, handleTextBlurErrors]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContextSetters();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container row={row}>
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValidText} up={labelIsUp} htmlFor={name}>
            {t(label)}
          </Input.Label>
          <Input.Field
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleInputFocus}
            id={name}
            name={name}
          />
        </Input.FieldWrapper>

        {!isValidText && (
          <Input.Error>
            {t(`TEXT.${errorMessage}`, localeErrorsParams)}
          </Input.Error>
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
        </Input.FeedbackWrapper>
      </Input.Container>

      {(title != null || text != null) && (
        <GTTooltip parentRef={containerRef} title={title} text={text} />
      )}
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

GTInputText.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  minWords: 0,
  maxWords: 0,
  defaultValidation: true,
  minChars: 0,
  maxChars: 0,
};
