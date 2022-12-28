/* eslint-disable operator-linebreak */
import { t } from "i18next";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Icon from "react-feather";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContext } from "../../../context/pageState";
import useOnClickOutside from "../../../hooks/helpers/useOnClickOutside";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import wordFilter from "../../../utils/wordFilter";
import GTTooltip from "../../Tooltip/Tooltip";
import Input, { Select } from "../Input";
import { IGTInputSelect, ISelectContext, ISelectOption, ISelectOptions, SelectionOptions } from "./interface";

const defaultValidationObj = ["required"];

const SelectContext = React.createContext<ISelectContext>({ preSelected: 0 });

function GTInputSelect({ name, label, options, text, title, row }: IGTInputSelect): JSX.Element {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

  const { labelIsUp, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name);

  const { validateState } = useValidateState(name, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // it is used to point the preSelected option
  const selectedIndexRef = useRef<number>(0);

  // it is used to focus/blur the input when the chevron is clicked
  const inputRef = useRef<HTMLInputElement>(null);

  // if the menu is open or not
  const [showOptions, setShowOptions] = useState(false);

  // the selected options
  const [selected, setSelected] = useState<string | number>("");

  // uses the index of the options array to keep track of the option that can be selected
  const [preSelected, setPreSelected] = useState<number>(0);

  // the selected option label
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
    setPreSelected(selectedIndexRef.current);
    setShowOptions(false);
  }, []);

  // update the select value
  const handleSelect = useCallback((option: SelectionOptions, selectedIndex: number) => {
    validateState(true, option.value);
    setSearchTerm(option.label);
    handleInputChange(option.label);
    setSelected(option.value);

    selectedIndexRef.current = selectedIndex;
    handleCloseSelect();
  }, [handleCloseSelect, handleInputChange, validateState]);

  const handleChevClick = useCallback(() => {
    setShowOptions((prev) => {
      // adds or removes the focus from the input
      if (!prev) {
        inputRef.current?.focus();
      } else {
        setSearchTerm("");
        inputRef.current?.blur();
      }

      return !prev;
    });
  }, []);

  const handleSelectFocus = useCallback((e: React.FormEvent) => {
    handleInputFocus();
  }, [handleInputFocus]);

  const handleSelectBlur = useCallback((e: React.FormEvent) => {
    handleInputBlur();
  }, [handleInputBlur]);

  const handleKey = useCallback(() => {
    // if it is not showing the options, open it
    const hasFocus = (containerRef.current?.contains(document.activeElement)) ?? false;
    if (!showOptions && hasFocus) {
      // discover if ref has focus
      setShowOptions(true);
    }
  }, [showOptions]);

  // checks if the user press the key down or up
  useEffect(() => {
    handleKey();

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnClickOutside(containerRef, null, handleCloseSelect);

  const { isLoading } = useGTPageStateContext();

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <SelectContext.Provider value={{ searchTerm, handleSelect, selected, setSelected, preSelected, setPreSelected }}>
      <Input.Container row={row} onFocus={handleShowOptions} ref={containerRef} isUp={showOptions}>
        <Input.Label up={labelIsUp} htmlFor={name}>
          {t(label)}
        </Input.Label>
        <Input.Field
          ref={inputRef}
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
          ((title != null) || (text != null)) && <>
            <Input.IconWrapper type="top_right" ref={iconRef}>
              <Icon.Info size={15} className="svg-no-active" />
            </Input.IconWrapper>

            <GTTooltip parentRef={iconRef} title={title} text={text} />
          </>
        }

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
  const { searchTerm, preSelected, setPreSelected, handleSelect } = React.useContext<ISelectContext>(SelectContext);

  const filteredOptions = useMemo(() => wordFilter(options, searchTerm ?? ""), [options, searchTerm]);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gets the pressed key
    const handleKey = (e: KeyboardEvent) => {
      setPreSelected?.((prev) => {
        let newValue = prev;

        // if the key is down arrow
        if (e.key === "ArrowDown") {
          newValue += 1;
        }

        // if the key is up arrow
        if (e.key === "ArrowUp") {
          newValue -= 1;
        }

        // if value is greater than the length of the options array
        if (newValue > filteredOptions.length - 1) {
          newValue = 0;
        }

        // if value is less than 0
        if (newValue < 0) {
          newValue = filteredOptions.length - 1;
        }

        // if the key is enter
        if (e.key === "Enter") {
          // get the selected option
          const selectedOption = filteredOptions[newValue];
          // sets the selected option
          handleSelect?.(selectedOption, newValue);
        }

        return newValue;
      });
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOptions, setPreSelected]);

  const oldPreSelected = useRef<number | null>(null);

  useEffect(() => {
    // when the filtered options changes, it sets the preselected to 0
    if (oldPreSelected.current !== null && oldPreSelected.current !== preSelected) {
      setPreSelected?.(0);
    } else {
      oldPreSelected.current = preSelected;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOptions, setPreSelected]);

  return (
    <Select.OptionsWrapper>
      <Select.OptionsContainer ref={selectRef}>
        {
          filteredOptions.map((option, index) =>
            <SelectOption selectRef={selectRef} index={index} option={option} key={option.value} />
          )
        }

        {
          filteredOptions.length === 0 && (
            <Select.NotFound>
              {t("SELECT.NOT_FOUND")}
            </Select.NotFound>
          )
        }

      </Select.OptionsContainer>
    </Select.OptionsWrapper>
  );
};

const SelectOption = ({ selectRef, option, index }: ISelectOption) => {
  const { handleSelect, selected, preSelected, setPreSelected } = React.useContext<ISelectContext>(SelectContext);

  const optionRef = useRef<HTMLDivElement>(null);

  const dontScrollToSelected = useRef<boolean>(false);

  const isSelected = useMemo(() => selected === option.value, [selected, option]);

  const isPreSelected = useMemo(() => preSelected === index, [preSelected, index]);

  useEffect(() => {
    if ((isSelected || isPreSelected) && !dontScrollToSelected.current) {
      // use the selectRef to scroll to the optionRef
      selectRef.current?.scrollTo({
        left: 0,
        top: (optionRef.current?.offsetTop ?? 0) - 70,
        behavior: "smooth"
      });
    }
  }, [isSelected, selectRef, isPreSelected]);

  const handleMouseOver = useCallback(() => {
    // we dont want to scroll to the selected option, because the user is hovering
    // therefore, the animation is not smooth
    dontScrollToSelected.current = true;
    setPreSelected?.(index);
  }, [index, setPreSelected]);

  // useEffect to detect hover on this component
  useEffect(() => {
    optionRef.current?.addEventListener("mouseover", handleMouseOver);
    const curr = selectRef.current;

    return () => {
      curr?.removeEventListener("mouseover", handleMouseOver);
      dontScrollToSelected.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPreSelected]);

  const onSelect = useCallback(() => {
    // we want to scroll to the selected option
    dontScrollToSelected.current = false;

    handleSelect?.(option, index);
  }, [handleSelect, index, option]);

  return (
    <Select.Value ref={optionRef} isPreSelected={isPreSelected} isSelected={isSelected} onClick={onSelect}>{option.label}</Select.Value>
  );
};
