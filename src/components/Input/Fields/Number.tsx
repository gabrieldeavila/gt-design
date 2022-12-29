/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateNumber from "../../../hooks/validation/useValidateNumber";
import useValidateState from "../../../hooks/validation/useValidateState";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputNumber } from "./interface";

const defaultValidationObj = ["required"];

function GTInputNumber({
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
}: IGTInputNumber) {
  const { t } = useTranslation();

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
    handleInputFocus,
  } = useInputValues(name);

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
      const { isValid, invalidMessage, errorsVar } = validateNumber(
        iVal,
        inputValidations
      );

      validateState(isValid, iVal);
      setIsValidNumber(isValid);
      setErrorMessage(invalidMessage);
      setLocaleErrorsParams(errorsVar);
      handleInputChange(iVal);

      onChange(e);
    },
    [
      validateNumber,
      inputValidations,
      validateState,
      handleInputChange,
      onChange,
    ]
  );

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
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
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

export default GTInputNumber;

GTInputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputNumber.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  defaultValidation: true,
};
