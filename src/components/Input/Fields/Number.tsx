/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
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
import useValidateNumber from "../../../hooks/validation/useValidateNumber";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
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
  onBlurValidate,
  onChangeValidate,
}: IGTInputNumber) {
  const { t } = useTranslation();
  const uniqueName = useUniqueName({ name });

  const { isLoading } = useGTPageStateContextSetters();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

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

  const { validateNumber } = useValidateNumber(min, max);

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage, errorsVar } = validateNumber(
      chars,
      inputValidations
    );

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    setLocaleErrorsParams(errorsVar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const { isValid, invalidMessage, errorsVar } = validateNumber(
        iVal,
        inputValidations
      );

      handleInputChange(iVal, isValid, invalidMessage, errorsVar);

      onChange?.(e);
    },
    [validateNumber, inputValidations, handleInputChange, onChange]
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
        isWrong={!isValid}
        ref={containerRef}
        row={row}
      >
        <Input.FieldWrapper>
          <Input.Label isWrong={!isValid} up={isLabelUp} htmlFor={uniqueName}>
            {t(label)}
          </Input.Label>
          <Input.Field
            type="number"
            value={value}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            id={uniqueName}
            name={uniqueName}
            autoComplete="off"
          />
        </Input.FieldWrapper>

        <ErrorMessage
          message={errorMessage}
          params={localeErrorsParams}
          isWrong={!isValid}
        />

        <Input.FeedbackWrapper>
          {isValidatingOnBlur && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}

          {(!_.isEmpty(value) || value > 0) && showFeedback && (
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
