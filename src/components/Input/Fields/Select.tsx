/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const { labelIsUp, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const { validateState } = useValidateState(name, []);

  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string | number>("");
  const [preSelected, setPreSelected] = useState<string | number>("");

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === selected);

    if (selectedOption != null) {
      return selectedOption.label;
    }

    return "";
  }, [options, selected]);

  // change the value of the input
  const handleChange = useCallback(
    (e: any) => {
      const { value: val } = e.target;
      setSearchTerm(val);

      handleInputChange(selectedLabel ?? val);
    },
    [handleInputChange, selectedLabel]
  );

  const handleShowOptions = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleCloseSelect = useCallback(() => {
    setSearchTerm("");
    setShowOptions(false);
  }, []);

  const handleSelect = useCallback((option: SelectionOptions) => {
    validateState(true, option.value);
    setSearchTerm(option.label);
    handleInputChange(option.label);
    setSelected(option.value);

    handleCloseSelect();
  }, [handleCloseSelect, handleInputChange, validateState]);

  const handleChevClick = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  const handleSelectFocus = useCallback((e: React.FormEvent) => {
    handleInputFocus();
  }, [handleInputFocus]);

  const handleSelectBlur = useCallback((e: React.FormEvent) => {
    handleInputBlur();
  }, [handleInputBlur]);

  const ref = useRef(null);

  useOnClickOutside(ref, null, handleCloseSelect);

  return (
    <SelectContext.Provider value={{ searchTerm, handleSelect, selected, setSelected, preSelected, setPreSelected }}>
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

  const selectRef = useRef<HTMLDivElement>(null);

  return (
    <Select.OptionsWrapper>
      <Select.OptionsContainer ref={selectRef}>
        {
          filteredOptions.map((option) =>
            <SelectOption selectRef={selectRef} option={option} key={option.value} />
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

const SelectOption = ({ selectRef, option }: ISelectOption) => {
  const { handleSelect, selected } = React.useContext<ISelectContext>(SelectContext);

  const optionRef = useRef<HTMLDivElement>(null);

  const isSelected = useMemo(() => selected === option.value, [selected, option]);

  useEffect(() => {
    if (isSelected) {
      // use the selectRef to scroll to the optionRef
      selectRef.current?.scrollTo({
        left: 0,
        top: (optionRef.current?.offsetTop ?? 0) - 70,
        behavior: "smooth"
      });
    }
  }, [isSelected, selectRef]);

  const onSelect = useCallback(() => {
    handleSelect?.(option);
  }, [handleSelect, option]);

  return (
    <Select.Value ref={optionRef} isSelected={isSelected} onClick={onSelect}>{option.label}</Select.Value>
  );
};
