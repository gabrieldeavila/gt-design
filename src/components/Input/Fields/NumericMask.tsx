
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGTPageStateContext } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useMask from "../../../hooks/pageState/useMask";
import useValidateNumber from "../../../hooks/validation/useValidateNumber";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputNumericMask } from "./interface";

const defaultValidationObj = ["required"];

function GTInputNumericMask({
  name,
  label,
  validations,
  defaultValidation,
  onChange,
  text,
  title,
  row,
  min,
  max,
  mask
}: IGTInputNumericMask) {
  const { t } = useTranslation();

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const { value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const { maskedValue, unMask } = useMask(value, mask);

  const { validateNumber } = useValidateNumber(min, max);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateNumber(chars, inputValidations);

    setIsValidNumber(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const unMaskedVal = unMask(iVal);
      const { isValid, invalidMessage, errorsVar } = validateNumber(unMaskedVal.toString(), inputValidations);

      validateState(isValid, unMaskedVal);
      setIsValidNumber(isValid);
      setErrorMessage(invalidMessage);
      setLocaleErrorsParams(errorsVar);
      handleInputChange(unMaskedVal.toString());

      onChange(e);
    },
    [unMask, validateNumber, inputValidations, validateState, handleInputChange, onChange]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContext();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <Input.Container row={row} ref={containerRef}>
      <Input.Label up htmlFor={name}>
        {t(label)}
      </Input.Label>
      <Input.Field
        type="text"
        value={maskedValue}
        onChange={handleChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        id={name}
        name={name}
        autoComplete="off"
      />

      {!isValidNumber && <Input.Error>{t(`NUMBER.${errorMessage}`, localeErrorsParams)}</Input.Error>}

      <GTTooltip parentRef={containerRef} title={title} text={text} />
    </Input.Container>
  );
}

export default GTInputNumericMask;

GTInputNumericMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputNumericMask.defaultProps = {
  onChange: () => { },
  validations: defaultValidationObj,
  defaultValidation: true,
};
