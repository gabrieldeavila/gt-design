/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef } from "react";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useGTTranslate from "../../../gt/Global/translate";
import useUniqueName from "../../../hooks/helpers/useUniqueName";
import useSwitchValues from "../../../hooks/pageState/useSwitchValues";
import GTNormalSwitch from "../../Switch/Template/Normal";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputSwitch } from "./interface";

const defaultValidationObj = ["required"];
function GTInputSwitch({
  name,
  label,
  validations = defaultValidationObj,
  defaultValidation = true,
  flexJustify,
  text,
  title,
  row,
  disabled,
}: IGTInputSwitch) {
  const { translateThis } = useGTTranslate();
  const uniqueName = useUniqueName({ name });

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const {
    value,
    handleMouseEnter,
    handleMouseLeave,
    handleInputChange,
  } = useSwitchValues(name, inputValidations, disabled);

  const handleChange = useCallback(
    (val: boolean) => {
      handleInputChange(val);
    },
    [handleInputChange]
  );

  const containerRef = useRef<HTMLLabelElement>(null);

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
        disabled={disabled}
        ref={containerRef}
      >
        <GTNormalSwitch
          onSwitchChange={handleChange}
          isChecked={!!value}
          name={uniqueName}
          disabled={disabled}
        />
        <Input.NormalizedLabel
          up={false}
          htmlFor={uniqueName}
        >
          {translateThis(label)}
        </Input.NormalizedLabel>

        <GTTooltip parentRef={containerRef} title={title} text={text} />
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
