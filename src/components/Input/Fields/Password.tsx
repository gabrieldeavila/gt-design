/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { useGTPageStateContext } from "../../../context/pageState";
import useGTTranslate from "../../../gt/Global/translate";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidatePassword from "../../../hooks/validation/useValidatePassword";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputPassword } from "./interface";
import RequiredMessage from "../Extras/RequiredMessage";

const defaultValidationObj = [
  "required",
  "eightLong",
  "oneSpecial",
  "oneLowercase",
  "oneNumber",
  "oneUppercase",
];

function GTInputPassword({
  disableClearable,
  name,
  label,
  defaultValidation = true,
  validations = defaultValidationObj,
  onChange,
  disabled,
  sameAs,
  title,
  text,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInputPassword) {
  const { translateThis } = useGTTranslate();
  const uniqueName = useUniqueName({ name });

  const containerRef = useRef<HTMLDivElement>(null);
  const inpRef = useRef<HTMLInputElement>(null);

  // state to keep track of all the inputs
  const { pageState, isLoading } = useGTPageStateContext();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

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

  // password validation
  const { validatePassword } = useValidatePassword();

  const [showPassword, setShowPassword] = useState(false);

  const type = useMemo(
    () => (showPassword ? "text" : "password"),
    [showPassword]
  );

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validatePassword(
      chars,
      inputValidations
    );

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);

    // add the focus on the last character
    const { length = 0 } = value.toString();
    inpRef.current?.focus();

    setTimeout(() => {
      inpRef.current?.setSelectionRange(length, length);
    });
  }, [value]);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const { isValid, invalidMessage } = validatePassword(
        iVal,
        inputValidations,
        sameAs
      );

      handleInputChange(iVal, isValid, invalidMessage);

      onChange?.(e, name)?.catch((err) => {
        console.error(err);
      });
    },
    [
      handleInputChange,
      name,
      inputValidations,
      onChange,
      sameAs,
      validatePassword,
    ]
  );

  const sameAsValue = useMemo(() => {
    if ((sameAs ?? "").length === 0 || !sameAs) return "";

    return pageState[sameAs] ?? "";
  }, [pageState, sameAs]);

  useEffect(() => {
    if (!value || !sameAs) return;

    const e = { target: { value } };

    handleChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAsValue]);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        row={row}
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
            ref={inpRef}
            type={type}
            onChange={handleChange}
            onBlur={handleInputBlur}
            value={value}
            onFocus={handleInputFocus}
            disabled={disabled}
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
          {!_.isEmpty(value) &&
            showFeedback &&
            !(disableClearable ?? false) &&
            !(disabled ?? false) && (
              <Input.IconWrapper onClick={handleInputClear}>
                <Icon.X size={15} className="svg-no-active cursor" />
              </Input.IconWrapper>
            )}

          {showPassword ? (
            <Icon.Eye onClick={handleShowPassword} />
          ) : (
            <Icon.EyeOff onClick={handleShowPassword} />
          )}

          {isValidatingOnBlur && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
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

export default GTInputPassword;

GTInputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func,
  sameAs: PropTypes.string,
};
