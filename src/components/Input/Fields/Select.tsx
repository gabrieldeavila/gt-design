/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import Input, { Select } from "../Input";
import { IGTInputSelect, ISelectOption, ISelectOptions } from "./interface";

const defaultValidationObj = ["required"];

function GTInputSelect({ name, label, validations, defaultValidation, onChange, options }: IGTInputSelect): JSX.Element {
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
    if (value.length === 0) return;

    const { isValid, invalidMessage } = validateEmail(value, inputValidations);

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

  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = useCallback(() => {
    console.log();
    setShowOptions((prev) => !prev);
  }, []);

  return (
    <Input.Container onFocus={handleShowOptions} onBlur={handleShowOptions} isUp={showOptions}>
      <Input.Label up={labelIsUp} htmlFor={name}>
        {label}
      </Input.Label>
      <Input.Field
        type="text"
        onChange={handleChange}
        value={value}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        id={name}
        name={name}
        autoComplete="off"
        isLabel
      />

      <ChevronDown />

      {!isValidEmail && <Input.Error>{t(`EMAIL.${errorMessage}`)}</Input.Error>}

      {/* {showOptions && */}
        <SelectOptions options={options} />
      {/* } */}
    </Input.Container>
  );
}

export default GTInputSelect;

GTInputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func
};

GTInputSelect.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => { },
};

const SelectOptions = ({ options }: ISelectOptions) => {
  return (
    <Select.Options>
      {
        options.map((option) =>
          <SelectOption option={option} key={option.value} />
        )
      }
    </Select.Options>
  );
};

const SelectOption = ({ option }: ISelectOption) => {
  return (
    <Select.Value>{option.label}</Select.Value>
  );
};
