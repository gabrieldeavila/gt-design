/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import useValidateText from "../../../hooks/validation/useValidateText";
import Loader from "../../Loader";
import GTNormalSwitch from "../../Switch/Template/Normal";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputText } from "./interface";

const defaultValidationObj = ["required"];
function GTInputSwitch({
  name,
  label,
  validations,
  defaultValidation,
  minWords,
  maxWords,
  minChars,
  maxChars,
  onChange,
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInputText) {
  const { t } = useTranslation();
  const uniqueName = useUniqueName({ name });

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
    value,
    isValidatingOnBlur,
    showFeedback,
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

  const { validateText } = useValidateText(
    minWords,
    maxWords,
    minChars,
    maxChars
  );

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateText(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useGTPageStateContextSetters();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.NormalizedContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        row={row}
        isWrong={!isValid}
        ref={containerRef}
      >
        <Input.FieldWrapper>
          <GTNormalSwitch />
          <Input.Label isWrong={!isValid} up={false} htmlFor={uniqueName}>
            {t(label)}
          </Input.Label>
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

          {!_.isEmpty(value) && showFeedback && (
            <Input.IconWrapper onClick={handleInputClear}>
              <Icon.X size={15} className="svg-no-active cursor" />
            </Input.IconWrapper>
          )}

          {_.isEmpty(errorMessage) && (
            <GTTooltip parentRef={containerRef} title={title} text={text} />
          )}
        </Input.FeedbackWrapper>
      </Input.NormalizedContainer>
    </>
  );
}

export default GTInputSwitch;

GTInputSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  minWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValidation: PropTypes.bool,
  minChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GTInputSwitch.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  minWords: 0,
  maxWords: 0,
  defaultValidation: true,
  minChars: 0,
  maxChars: 0,
};
