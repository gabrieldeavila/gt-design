/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import TeaserTip from "../../Tooltip/Template/Teasers";
import Input from "../Input";
import { IGTInput } from "./interface";

const defaultValidationObj = ["required"];

function GTInputEmail({ name, label, validations, defaultValidation, onChange }: IGTInput): JSX.Element {
  const { t } = useTranslation();

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

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
      const { isValid, invalidMessage } = validateEmail(emailVal, inputValidations);

      validateState(isValid, emailVal);
      setIsValidEmail(isValid);
      setErrorMessage(invalidMessage);
      handleInputChange(emailVal);

      onChange(e);
    },
    [validateEmail, inputValidations, validateState, handleInputChange, onChange]
  );

  return (
    <Input.Container>
      <Input.Label up={labelIsUp} htmlFor={name}>
        {label}
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

      {!isValidEmail && <Input.Error>{t(`EMAIL.${errorMessage}`)}</Input.Error>}

      <TeaserTip />
    </Input.Container>
  );
}

export default GTInputEmail;

GTInputEmail.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func
};

GTInputEmail.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => { }
};
