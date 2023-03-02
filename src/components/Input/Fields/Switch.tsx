/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTNormalSwitch from "../../Switch/Template/Normal";
import GTTooltip from "../../Tooltip/Tooltip";
import ErrorMessage from "../Extras/ErrorMessage";
import Input from "../Input";
import { IGTInputSwitch } from "./interface";

const defaultValidationObj = ["required"];
function GTInputSwitch({
  name,
  label,
  validations,
  defaultValidation,
  flexJustify,
  text,
  title,
  row,
  onBlurValidate,
  onChangeValidate,
}: IGTInputSwitch) {
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
    isRequired,
    value,
    isValidatingOnBlur,
    showFeedback,
    handleMouseEnter,
    handleMouseLeave,
    handleInputChange,
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

  const handleChange = useCallback(
    (val: boolean) => {
      handleInputChange(val, isValid);
    },
    [handleInputChange, isValid]
  );

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
        flexJustify={flexJustify}
        row={row}
        isWrong={!isValid}
        ref={containerRef}
      >
        <GTNormalSwitch
          onSwitchChange={handleChange}
          isChecked={!!value}
          name={uniqueName}
        />
        <Input.NormalizedLabel
          isWrong={!isValid}
          up={false}
          htmlFor={uniqueName}
          isRequired={isRequired}
        >
          {t(label)}
        </Input.NormalizedLabel>

        <ErrorMessage
          message={errorMessage}
          params={localeErrorsParams}
          isWrong={!isValid}
        />

        {isValidatingOnBlur && showFeedback && (
          <Input.FeedbackWrapper>
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          </Input.FeedbackWrapper>
        )}

        {_.isEmpty(errorMessage) && (
          <GTTooltip parentRef={containerRef} title={title} text={text} />
        )}
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
