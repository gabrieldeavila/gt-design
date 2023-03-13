import { IGTTooltipRef } from "../../Tooltip/interface";

/* eslint-disable @typescript-eslint/indent */
type TBlurValidateResult = [boolean, string] | [boolean, string, Object];

export type TBlurValidate = (
  value: string | number
) => TBlurValidateResult | Promise<TBlurValidateResult>;

export type TChangeValidate = (
  value: string | number
) => [boolean, string] | [boolean, string, Object];

export interface IGTInput {
  name: string;
  label: string;
  validations: string[];
  defaultValidation: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onChangeValidate?: TChangeValidate;
  disableClearable?: boolean;
  title?: string;
  text?: string;
  row?: number;
  disabled?: boolean;
  onBlurValidate?: TBlurValidate;
}

export interface IGTInputText extends IGTInput {
  minWords?: number | string;
  maxWords?: number | string;
  minChars?: number | string;
  maxChars?: number | string;
}

export interface IGTInputDate extends IGTInput {
  min?: number | string;
  max?: number | string;
}

export interface IGTInputSwitch extends IGTInput {
  flexJustify?: string;
}

export interface IGTInputNumber extends IGTInput {
  min?: number | string;
  max?: number | string;
}

export interface INumericMask {
  suffix: string;
  prefix: string;
  thousandsSeparatorSymbol: string;
  decimalSymbol: string;
  decimalLimit: number;
  integerLimit: number;
  allowNegative: boolean;
  type: "numeric_mask";
  min?: number | string;
  max?: number | string;
}

export interface INonNumericMask {
  type: "non_numeric_mask";
  options: string[];
}

export type TNumericOptions = INumericMask | INonNumericMask;

export interface IGTInputMask extends IGTInput {
  mask: TNumericOptions;
  isGuided?: boolean;
  min?: number | string;
  max?: number | string;
}

export interface IGTInputPassword extends IGTInput {
  sameAs?: string;
}

export interface SelectionOptions {
  value: string | number;
  label: string;
}

export interface IGTInputSelect extends IGTInput {
  options: SelectionOptions[];
  onSelect?: (option: SelectionOptions) => void | Promise<void>;
}

export interface ISelectOptions {
  options: SelectionOptions[];
}

export interface ISelectOption {
  option: SelectionOptions;
  selectRef: React.RefObject<HTMLDivElement>;
  index: number;
}

export interface ISelectContext {
  searchTerm?: string;
  handleSelect?: (option: SelectionOptions, index: number) => void;
  selected?: string | number;
  setSelected?: React.Dispatch<React.SetStateAction<string | number>>;
  preSelected: number;
  setPreSelected?: React.Dispatch<React.SetStateAction<number>>;
  containerRef?: React.RefObject<HTMLDivElement>;
  tooltipRef?: React.RefObject<IGTTooltipRef>;
}
