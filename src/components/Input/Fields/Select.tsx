/* eslint-disable operator-linebreak */
import { t } from "i18next";
import PropTypes from "prop-types";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Icon from "react-feather";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useOnClickOutside from "../../../hooks/helpers/useOnClickOutside";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useValidateState from "../../../hooks/validation/useValidateState";
import wordFilter from "../../../utils/wordFilter";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import Input, { Select } from "../Input";
import {
  IGTInputSelect,
  ISelectContext,
  ISelectOption,
  ISelectOptions,
  SelectionOptions,
} from "./interface";

const defaultValidationObj = ["required"];

const SelectContext = React.createContext<ISelectContext>({ preSelected: 0 });

function GTInputSelect({
  name,
  label,
  options,
  text,
  title,
  row,
  onChange,
  onBlurValidate,
  onChangeValidate,
}: IGTInputSelect): JSX.Element {
  const { t } = useTranslation();

  const { isLoading } = useGTPageStateContextSetters();

  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  const { validateState } = useValidateState(name, []);

  const {
    isValidatingOnBlur,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
  } = useInputValues(
    name,
    validateState,
    setIsValid,
    setErrorMessage,
    setLocaleErrorsParams,
    onBlurValidate,
    onChangeValidate
  );

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
      const { value: iVal } = e.target;
      setSearchTerm(iVal);

      handleInputChange(iVal, isValid);

      onChange?.(e);
    },
    [handleInputChange, isValid, onChange]
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
  const handleSelect = useCallback(
    (option: SelectionOptions, selectedIndex: number) => {
      validateState(true, option.value);
      setSearchTerm(option.label);
      handleInputChange(option.label, true);
      setSelected(option.value);

      selectedIndexRef.current = selectedIndex;
      handleCloseSelect();
    },
    [handleCloseSelect, handleInputChange, validateState]
  );

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

  const handleKey = useCallback(() => {
    // if it is not showing the options, open it
    const hasFocus =
      containerRef.current?.contains(document.activeElement) ?? false;
    if (!showOptions && hasFocus) {
      // discovers if the ref has focus
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

  const isSelectUp = useMemo(
    () => showOptions || selected !== "",
    [showOptions, selected]
  );

  useOnClickOutside(containerRef, null, handleCloseSelect);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <SelectContext.Provider
        value={{
          searchTerm,
          handleSelect,
          selected,
          setSelected,
          preSelected,
          setPreSelected,
          containerRef,
        }}
      >
        <Input.Container
          row={row}
          onFocus={handleShowOptions}
          ref={containerRef}
          isUp={showOptions}
        >
          <Input.FieldWrapper>
            <Input.Label isWrong={!isValid} up={isSelectUp} htmlFor={name}>
              {t(label)}
            </Input.Label>
            <Input.Field
              ref={inputRef}
              type="text"
              onChange={handleChange}
              value={searchTerm}
              placeholder={selectedLabel}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              id={name}
              name={name}
              autoComplete="off"
              isLabel
            />
          </Input.FieldWrapper>

          {!isValid && (
            <Input.Error>{t(errorMessage, localeErrorsParams)}</Input.Error>
          )}

          <Input.FeedbackWrapper>
            {(title != null || text != null) && (
              <Input.IconWrapper ref={iconRef} onClick={handleChevClick}>
                <Icon.Info size={15} className="svg-no-active" />
              </Input.IconWrapper>
            )}

            <Input.IconWrapper showOpacity onClick={handleChevClick}>
              <ChevronDown />
            </Input.IconWrapper>

            {isValidatingOnBlur && (
              <Input.IconWrapper showOpacity>
                <Loader.Simple size="sm" />
              </Input.IconWrapper>
            )}
          </Input.FeedbackWrapper>
          {showOptions && <SelectOptions options={options} />}
        </Input.Container>
      </SelectContext.Provider>

      {(title != null || text != null) && (
        <>
          <GTTooltip parentRef={iconRef} title={title} text={text} />
        </>
      )}
    </>
  );
}

export default GTInputSelect;

GTInputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
  onChange: PropTypes.func,
};

GTInputSelect.defaultProps = {
  validations: defaultValidationObj,
  defaultValidation: true,
  onChange: () => {},
};

const SelectOptions = memo(function SelectOptions({ options }: ISelectOptions) {
  const {
    searchTerm,
    preSelected,
    setPreSelected,
    handleSelect,
    containerRef,
  } = useContext<ISelectContext>(SelectContext);

  const filteredOptions = useMemo(
    () => wordFilter(options, searchTerm ?? ""),
    [options, searchTerm]
  );

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
          e.preventDefault();
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
    if (
      oldPreSelected.current !== null &&
      oldPreSelected.current !== preSelected
    ) {
      setPreSelected?.(0);
    } else {
      oldPreSelected.current = preSelected;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOptions, setPreSelected]);

  const [isTop, setIsTop] = useState<undefined | boolean>(undefined);

  // checks if the container should be on top or bottom
  useEffect(() => {
    if (containerRef?.current != null) {
      const { top } = containerRef.current?.getBoundingClientRect();

      // by default, the options wrapper width is 10rem, so 300px gives a little bit of space
      const isHittingBottom = top + 300 > window.innerHeight;
      // it avoids to show the options on top if the container is too close to the top
      const isHittingTop = top - 300 < 0;

      if (isHittingBottom && !isHittingTop) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    }
  }, [containerRef]);

  // avoids the flickering
  if (isTop === undefined) return null;

  return (
    <Select.OptionsWrapper isTop={isTop}>
      <Select.OptionsContainer ref={selectRef}>
        {filteredOptions.map((option, index) => (
          <SelectOption
            selectRef={selectRef}
            index={index}
            option={option}
            key={option.value}
          />
        ))}

        {filteredOptions.length === 0 && (
          <Select.NotFound>{t("SELECT_NOT_FOUND")}</Select.NotFound>
        )}
      </Select.OptionsContainer>
    </Select.OptionsWrapper>
  );
});

const SelectOption = memo(function SelectOption({
  selectRef,
  option,
  index,
}: ISelectOption) {
  const { handleSelect, selected, preSelected, setPreSelected } =
    useContext<ISelectContext>(SelectContext);

  const optionRef = useRef<HTMLDivElement>(null);

  const dontScrollToSelected = useRef<boolean>(false);

  const isSelected = useMemo(
    () => selected === option.value,
    [selected, option]
  );

  const isPreSelected = useMemo(
    () => preSelected === index,
    [preSelected, index]
  );

  useEffect(() => {
    if ((isSelected || isPreSelected) && !dontScrollToSelected.current) {
      // use the selectRef to scroll to the optionRef
      selectRef.current?.scrollTo({
        left: 0,
        top: (optionRef.current?.offsetTop ?? 0) - 70,
        behavior: "smooth",
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
    <Select.Value
      ref={optionRef}
      isPreSelected={isPreSelected}
      isSelected={isSelected}
      onClick={onSelect}
    >
      {option.label}
    </Select.Value>
  );
});
