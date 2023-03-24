/* eslint-disable @typescript-eslint/indent */
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
import useValidateDate from "../../../hooks/validation/useValidateDate";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputDate } from "./interface";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

const defaultValidationObj = ["required"];
function GTInputDate({
  disableClearable,
  name,
  label,
  validations,
  defaultValidation,
  min,
  max,
  disabled,
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInputDate) {
  const { t } = useTranslation();
  const uniqueName = useUniqueName({ name });
  const alterFieldRef = useRef<boolean>(true);

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
    isRequired,
    value,
    isValidatingOnBlur,
    showFeedback,
    handleInputChange,
    handleInputBlur,
    handleInputBlurErrors,
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
    inputValidations,
    disabled
  );

  const currDate = useMemo(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    () => (value ?? false ? parseISO(value.toString()) : new Date()),
    [value]
  );

  const { validateDate } = useValidateDate(min, max);

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateDate(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (date: Date) => {
      // gets the value from Date to yyyy-mm-dd, using date-fns
      const newDate = format(date, "yyyy-MM-dd");

      const { isValid, invalidMessage, errorsVars } = validateDate(
        newDate,
        inputValidations
      );

      handleInputChange(newDate, isValid, invalidMessage, errorsVars);
    },
    [validateDate, inputValidations, handleInputChange]
  );

  const handleBlur = useCallback(() => {
    handleInputBlur();

    if (alterFieldRef.current) {
      handleInputBlurErrors().catch((e) => console.error(e));
    }

    alterFieldRef.current = false;
  }, [handleInputBlur, handleInputBlurErrors]);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleInputFocus(e, true);
    },
    [handleInputFocus]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContextSetters();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <Input.Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      row={row}
      isWrong={!isValid}
      disabled={disabled}
      ref={containerRef}
    >
      <Input.FieldWrapper>
        <Input.Label
          isRequired={isRequired}
          isWrong={!isValid}
          up={!_.isEmpty(value)}
          htmlFor={uniqueName}
        >
          {t(label)}
        </Input.Label>

        <Input.DatePicker
          name={uniqueName}
          id={uniqueName}
          selected={currDate}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          color={_.isEmpty(value) ? "transparent" : ""}
        />
      </Input.FieldWrapper>

      <ErrorMessage
        message={errorMessage}
        params={localeErrorsParams}
        isWrong={!isValid}
      />

      <Input.FeedbackWrapper>
        {isValidatingOnBlur && showFeedback && (
          <Input.IconWrapper showOpacity>
            <Loader.Simple size="sm" />
          </Input.IconWrapper>
        )}

        {!_.isEmpty(value) &&
          !(disableClearable ?? false) &&
          showFeedback &&
          !(disabled ?? false) && (
            <Input.IconWrapper onClick={handleInputClear}>
              <Icon.X size={15} className="svg-no-active cursor" />
            </Input.IconWrapper>
          )}

        {_.isEmpty(errorMessage) && (
          <GTTooltip parentRef={containerRef} title={title} text={text} />
        )}
      </Input.FeedbackWrapper>
    </Input.Container>
  );
}

export default GTInputDate;

GTInputDate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputDate.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  defaultValidation: true,
};
