/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContext } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidatePassword from "../../../hooks/validation/useValidatePassword";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputPassword } from "./interface";

const defaultValidationObj = [
  "required",
  "eightLong",
  "oneSpecial",
  "oneLowercase",
  "oneNumber",
  "oneUppercase"
];

function GTInputPassword({ name, label, defaultValidation, validations, onChange, sameAs, title, text, row }: IGTInputPassword) {
  const { t } = useTranslation();

  // state to keep track of all the inputs
  const { pageState, isLoading } = useGTPageStateContext();

  // validations that are passed to the input
  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  // validates if the input is or not valid
  const { validateState } = useValidateState(name, inputValidations);

  // shows the label up or down
  const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  // password validation
  const { validatePassword } = useValidatePassword();
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const type = useMemo(() => (showPassword ? "text" : "password"), [showPassword]);

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validatePassword(chars, inputValidations);

    setIsValidPassword(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const handleBlur = useCallback(() => {
    handleInputBlur();
  }, [handleInputBlur]);

  const handleChange = useCallback(
    (e: any) => {
      const { value: pswVal } = e.target;
      const { isValid, invalidMessage } = validatePassword(pswVal, inputValidations, sameAs);

      validateState(isValid, pswVal);
      setIsValidPassword(isValid);
      setErrorMessage(invalidMessage);
      handleInputChange(pswVal);

      onChange(e);
    },
    [handleInputChange, inputValidations, onChange, sameAs, validatePassword, validateState]
  );

  const sameAsValue = useMemo(() => {
    if ((sameAs ?? "").length === 0 || !sameAs) return "";

    return pageState[sameAs] || "";
  }, [pageState, sameAs]);

  useEffect(() => {
    if (!value || !sameAs) return;

    const e = { target: { value } };

    handleChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAsValue]);

  const containerRef = useRef<HTMLDivElement>(null);

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
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          onFocus={handleInputFocus}
          id={name}
          name={name}
        />

        {showPassword
          ? (
            <Icon.Eye onClick={handleShowPassword} />
            )
          : (
            <Icon.EyeOff onClick={handleShowPassword} />
            )
        }

        {!isValidPassword && <Input.Error>{t(`PASSWORD.${errorMessage}`)}</Input.Error>}

        {
          ((title != null) || (text != null)) && <Input.IconWrapper type="top_right" ref={containerRef}>
            <Icon.Info size={15} className="svg-no-active" />
          </Input.IconWrapper>
        }

        <GTTooltip parentRef={containerRef} title={title} text={text} />
      </Input.Container>

      {
        ((title != null) || (text != null)) && <GTTooltip parentRef={containerRef} title={title} text={text} />
      }
    </>

  );
}

export default GTInputPassword;

GTInputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func,
  sameAs: PropTypes.string
};

GTInputPassword.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => { },
  sameAs: ""
};
