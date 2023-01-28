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
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInput } from "./interface";

const defaultValidationObj = ["required"];

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
}: IGTInput): JSX.Element {
  const { t } = useTranslation();
  const alterFieldRef = useRef<boolean>(true);

  const { isLoading } = useGTPageStateContextSetters();

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const {
    labelIsUp,
    value,
    handleInputChange,
    handleInputBlur,
    handleInputBlurErrors,
    handleInputFocus,
  } = useInputValues(name, validateState, onBlurValidate);

  const { validateEmail } = useValidateEmail();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateEmail(chars, inputValidations);

    setIsValidEmail(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: emailVal } = e.target;
      const { isValid, invalidMessage } = validateEmail(
        emailVal,
        inputValidations
      );

      validateState(isValid, emailVal);
      setIsValidEmail(isValid);
      setErrorMessage(invalidMessage);
      handleInputChange(emailVal);
      alterFieldRef.current = true;

      onChange(e);
    },
    [
      validateEmail,
      inputValidations,
      validateState,
      handleInputChange,
      onChange,
    ]
  );

  const handleEmailBlurErrors = useCallback(async () => {
    const [isValid, errorMessage = ""] = (await handleInputBlurErrors()) ?? [];

    if (isValid == null) {
      return;
    }

    setIsValidEmail(isValid);
    setErrorMessage(errorMessage);
  }, [handleInputBlurErrors]);

  const handleBlur = useCallback(() => {
    handleInputBlur();

    if (alterFieldRef.current) {
      handleEmailBlurErrors().catch((e) => console.error(e));
    }

    alterFieldRef.current = false;
  }, [handleInputBlur, handleEmailBlurErrors]);

  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container row={row}>
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValidEmail} up={labelIsUp} htmlFor={name}>
            {t(label)}
          </Input.Label>
          <Input.Field
            type="email"
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            onFocus={handleInputFocus}
            id={name}
            name={name}
          />
        </Input.FieldWrapper>

        {!isValidEmail && <Input.Error>{t(errorMessage)}</Input.Error>}

        <Input.FeedbackWrapper>
          {(title != null || text != null) && (
            <Input.IconWrapper ref={containerRef}>
              <Icon.Info size={15} className="svg-no-active" />
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
