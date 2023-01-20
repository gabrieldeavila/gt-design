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
import useMask from "../../../hooks/pageState/useMask";
import useValidateNumber from "../../../hooks/validation/useValidateNumber";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputMask } from "./interface";

const defaultValidationObj = ["required"];

function GTInputMask({
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
  mask,
}: IGTInputMask) {
  const { t } = useTranslation();

  const { isLoading } = useGTPageStateContextSetters();

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const { value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const inpRef = useRef<HTMLInputElement>(null);

  const { maskedValue, unMask } = useMask(value, mask, inpRef);

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
      const { isValid, invalidMessage, errorsVar } = validateNumber(
        unMaskedVal.toString(),
        inputValidations
      );

      validateState(isValid, unMaskedVal);
      setIsValidNumber(isValid);
      setErrorMessage(invalidMessage);
      setLocaleErrorsParams(errorsVar);
      handleInputChange(unMaskedVal.toString());

      onChange(e);
    },
    [
      unMask,
      validateNumber,
      inputValidations,
      validateState,
      handleInputChange,
      onChange,
    ]
  );

  const handleFocus = useCallback(() => {
    const { type } = mask;

    handleInputFocus();

    if (inpRef.current == null) return;

    if (type === "numeric_mask") {
      // selection range is in the end of the input
      inpRef.current.setSelectionRange(
        inpRef.current.value.length,
        inpRef.current.value.length
      );
      return;
    }

    if (type === "non_numeric_mask") {
      inpRef.current.setSelectionRange(0, 0);
    }
  }, [handleInputFocus, mask]);

  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container row={row}>
        {/* TO DO: ADD VALIDATIONS TO NUMERIC MAS AND CHANGES ITS NAME TO MASK ONLY BECAUSE WE DONT HAVE TWO TYPES OF MASKS */}
        <Input.Label isWrong={false} up htmlFor={name}>
          {t(label)}
        </Input.Label>
        <Input.Field
          ref={inpRef}
          type="text"
          value={maskedValue}
          onChange={handleChange}
          onBlur={handleInputBlur}
          onFocus={handleFocus}
          id={name}
          name={name}
          autoComplete="off"
        />

        {!isValidNumber && (
          <Input.Error>
            {t(`NUMBER.${errorMessage}`, localeErrorsParams)}
          </Input.Error>
        )}

        {(title != null || text != null) && (
          <Input.IconWrapper type="center" ref={containerRef}>
            <Icon.Info size={15} className="svg-no-active" />
          </Input.IconWrapper>
        )}
      </Input.Container>

      {(title != null || text != null) && (
        <GTTooltip parentRef={containerRef} title={title} text={text} />
      )}
    </>
  );
}

export default GTInputMask;

GTInputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputMask.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  defaultValidation: true,
};
