/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import useOnClickOutside from "../../../hooks/helpers/useOnClickOutside";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import wordFilter from "../../../utils/wordFilter";
import Input, { Select } from "../Input";
import { IGTInputSelect, ISelectContext, ISelectOption, ISelectOptions, SelectionOptions } from "./interface";

const defaultValidationObj = ["required"];

const SelectContext = React.createContext<ISelectContext>({});

function GTInputSelect({ name, label, validations, defaultValidation, onChange, options }: IGTInputSelect): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const { labelIsUp, value, setValue, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const { validateState } = useValidateState(name, []);

  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string | number>("");

  const [isFocused, setIsFocused] = useState(false);

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === selected);

    if (selectedOption != null) {
      return selectedOption.label;
    }

    return "";
  }, [options, selected]);

  // value shown in input
  const selectValue = useMemo(() => {
    const val = isFocused ? value : selectedLabel;
    // console.log(isFocused, value, selectedLabel);
    handleInputChange(val.toString());

    return val;
  }, [handleInputChange, isFocused, selectedLabel, value]);

  // change the value of the input
  const handleChange = useCallback(
    (e: any) => {
      const { value: val } = e.target;
      setSearchTerm(val);
      handleInputChange(val);
    },
    [handleInputChange]
  );

  const handleShowOptions = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleSelect = useCallback((option: SelectionOptions) => {
    validateState(true, option.value);
    setSelected(option.value);
  }, [validateState]);

  const handleChevClick = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  const handleSelectFocus = useCallback((e: React.FormEvent) => {
    setIsFocused(true);
    handleInputFocus();
  }, [handleInputFocus]);

  const handleSelectBlur = useCallback((e: React.FormEvent) => {
    setSearchTerm("");
    setIsFocused(false);
    handleInputBlur();
  }, [handleInputBlur]);

  const ref = useRef(null);

  useOnClickOutside(ref, null, () => setShowOptions(false));

  return (
    <SelectContext.Provider value={{ searchTerm, handleSelect, selected, setSelected }}>
      <Input.Container ref={ref} onFocus={handleShowOptions} isUp={showOptions}>
        <Input.Label up={labelIsUp} htmlFor={name}>
          {label}
        </Input.Label>
        <Input.Field
          type="text"
          onChange={handleChange}
          value={searchTerm}
          placeholder={selectedLabel}
          onBlur={handleSelectBlur}
          onFocus={handleSelectFocus}
          id={name}
          name={name}
          autoComplete="off"
          isLabel
        />

        <ChevronDown onClick={handleChevClick} />

        {
          showOptions && (
            <SelectOptions options={options} />
          )
        }
      </Input.Container>
    </SelectContext.Provider>
  );
}

export default GTInputSelect;

GTInputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func
};

GTInputSelect.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => { },
};

const SelectOptions = ({ options }: ISelectOptions) => {
  const { searchTerm } = React.useContext<ISelectContext>(SelectContext);

  const filteredOptions = useMemo(() => wordFilter(options, searchTerm ?? ""), [options, searchTerm]);

  return (
    <Select.OptionsWrapper>
      <Select.OptionsContainer>
        {
          filteredOptions.map((option) =>
            <SelectOption option={option} key={option.value} />
          )
        }

        {
          filteredOptions.length === 0 && (
            <Select.NotFound>
              No options found 😖
            </Select.NotFound>
          )
        }

      </Select.OptionsContainer>
    </Select.OptionsWrapper>
  );
};

const SelectOption = ({ option }: ISelectOption) => {
  const { handleSelect, selected } = React.useContext<ISelectContext>(SelectContext);

  const isSelected = useMemo(() => selected === option.value, [selected, option]);

  const onSelect = useCallback(() => {
    console.log("mano q pasa");
    handleSelect?.(option);
  }, [handleSelect, option]);

  return (
    <Select.Value isSelected={isSelected} onClick={onSelect}>{option.label}</Select.Value>
  );
};
