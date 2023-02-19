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
      <Input.Container row={row} isWrong={!isValid}>
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValid} up={isLabelUp} htmlFor={name}>
            {t(label)}
          </Input.Label>
          <Input.Field
            type="email"
            onChange={handleChange}
            value={value}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            id={name}
            name={name}
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

          {!_.isEmpty(value) && (
            <Input.IconWrapper onClick={handleInputClear}>
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
