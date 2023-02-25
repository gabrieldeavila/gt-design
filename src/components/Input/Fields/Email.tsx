/* eslint-disable @typescript-eslint/no-misused-promises */
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
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInput } from "./interface";

const defaultValidationObj = ["required", "email"];

function GTInputEmail({
  name,
  label,
  validations,
  defaultValidation,
  onChange,
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInput): JSX.Element {
  const { t } = useTranslation();
  const uniqueName = useUniqueName({ name });

  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  const { isLoading } = useGTPageStateContextSetters();

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
    inputValidations
  );

  const { validateEmail } = useValidateEmail();

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateEmail(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const { isValid, invalidMessage } = validateEmail(iVal, inputValidations);

      handleInputChange(iVal, isValid, invalidMessage);

      onChange?.(e);
    },
    [validateEmail, inputValidations, handleInputChange, onChange]
  );

  const containerRef = useRef<HTMLDivElement>(null);

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
        ref={containerRef}
      >
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValid} up={isLabelUp} htmlFor={uniqueName}>
            {t(label)}
          </Input.Label>
          <Input.Field
            type="email"
            onChange={handleChange}
            value={value}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            id={uniqueName}
            name={uniqueName}
          />
        </Input.FieldWrapper>

        {!isValid && (
          <Input.Error>{t(errorMessage, localeErrorsParams)}</Input.Error>
        )}

        <Input.FeedbackWrapper>
          {isValidatingOnBlur && showFeedback && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}

          {!_.isEmpty(value) && showFeedback && (
            <Input.IconWrapper onClick={handleInputClear}>
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

export default GTInputEmail;

GTInputEmail.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func,
};

GTInputEmail.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => {},
};
