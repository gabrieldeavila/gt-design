/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "react-feather";
import useInputValues from "../../../hooks/pageState/useInputValues";
import wordFilter from "../../../utils/wordFilter";
import Input, { Select } from "../Input";
import { IGTInputSelect, ISelectContext, ISelectOption, ISelectOptions, SelectionOptions } from "./interface";

const defaultValidationObj = ["required"];

const SelectContext = React.createContext<ISelectContext>({});

function GTInputSelect({ name, label, validations, defaultValidation, onChange, options }: IGTInputSelect): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const handleChange = useCallback(
    (e: any) => {
      const { value: val } = e.target;
      setSearchTerm(val);
      handleInputChange(val);
    },
    [handleInputChange]
  );

  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<SelectionOptions>(options[0]);

  const handleShowOptions = useCallback(() => {
    console.log();
    setShowOptions((prev) => !prev);
  }, []);

  const handleSelect = useCallback((option: SelectionOptions) => {
    console.log("heheheh", option);
    setSelected(option);
  }, []);

  return (
    <SelectContext.Provider value={{ searchTerm, handleSelect, selected, setSelected }}>
      <Input.Container onFocus={handleShowOptions} onBlur={handleShowOptions} isUp={showOptions}>
        <Input.Label up={labelIsUp} htmlFor={name}>
          {label}
        </Input.Label>
        <Input.Field
          type="text"
          onChange={handleChange}
          value={value}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          id={name}
          name={name}
          autoComplete="off"
          isLabel
        />

        <ChevronDown />
        <SelectOptions options={options} />
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

  // const [selectedOption, setSelectedOption] = useState(options[0]);

  const filteredOptions = useMemo(() => wordFilter(options, searchTerm ?? ""), [options, searchTerm]);

  return (
    <Select.OptionsWrapper>
      <Select.OptionsContainer>
        {
          filteredOptions.map((option) =>
            <SelectOption option={option} key={option.value} />
          )
        }
      </Select.OptionsContainer>
    </Select.OptionsWrapper>
  );
};

const SelectOption = ({ option }: ISelectOption) => {
  const { handleSelect, selected } = React.useContext<ISelectContext>(SelectContext);

  const isSelected = useMemo(() => selected?.value === option.value, [selected, option]);

  const onSelect = useCallback(() => {
    handleSelect?.(option);
  }, [handleSelect, option]);

  return (
    <Select.Value isSelected={isSelected} onClick={onSelect}>{option.label}</Select.Value>
  );
};
