/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useGTTranslate from "../../../gt/Global/translate";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateEmail from "../../../hooks/validation/useValidateEmail";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInput } from "./interface";
import RequiredMessage from "../Extras/RequiredMessage";

const defaultValidationObj = ["required", "email"];

function GTInputEmail({
  name,
  label,
  validations = defaultValidationObj,
  defaultValidation = true,
  disabled,
  disableClearable,
  onChange = () => {},
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInput): JSX.Element {
  const { translateThis } = useGTTranslate();
  const uniqueName = useUniqueName({ name });

  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  const { isLoading } = useGTPageStateContextSetters();

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const {
    isRequired,
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
    inputValidations,
    disabled
  );

  const { validateEmail } = useValidateEmail();

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateEmail(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const { isValid, invalidMessage } = validateEmail(iVal, inputValidations);

      handleInputChange(iVal, isValid, invalidMessage);

      onChange?.(e, name)?.catch((err) => {
        console.error(err);
      });
    },
    [validateEmail, name, inputValidations, handleInputChange, onChange]
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
        row={row}
        disabled={disabled}
        isWrong={!isValid}
        ref={containerRef}
      >
        <Input.FieldWrapper>
          <Input.Label
            isRequired={isRequired}
            isWrong={!isValid}
            up={isLabelUp}
            htmlFor={uniqueName}
          >
            {translateThis(label)}
            <RequiredMessage isRequired={isRequired} />
          </Input.Label>
          <Input.Field
            type="email"
            onChange={handleChange}
            disabled={disabled}
            value={value}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            id={uniqueName}
            name={uniqueName}
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

          {!_.isEmpty(value) &&
            showFeedback &&
            !(disableClearable ?? false) &&
            !(disabled ?? false) && (
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

export default GTInputEmail;

GTInputEmail.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func,
};
