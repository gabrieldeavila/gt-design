/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContext } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInput } from "./interface";

const defaultValidationObj = ["required"];

function GTInputEmail({ name, label, validations, defaultValidation, onChange, text, title, row }: IGTInput): JSX.Element {
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

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContext();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container row={row}>
        <Input.Label up={labelIsUp} htmlFor={name}>
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

        {!isValidEmail && <Input.Error>{t(`EMAIL.${errorMessage}`)}</Input.Error>}

        {
          ((title != null) || (text != null)) &&
          <Input.IconWrapper type="center" ref={containerRef}>
            <Icon.Info size={15} className="svg-no-active" />
          </Input.IconWrapper>
        }
      </Input.Container>

      {
        ((title != null) || (text != null)) &&
        <GTTooltip parentRef={containerRef} title={title} text={text} />

      }
    </>
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
