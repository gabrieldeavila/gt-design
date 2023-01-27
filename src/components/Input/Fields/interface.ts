export type TBlurValidate = (
  value: string | number
) => [boolean, string] | Promise<[boolean, string]>;

export interface IGTInput {
  name: string;
  label: string;
  validations: string[];
  defaultValidation: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onMaskChange?: (value: string) => {
    isValidMask: boolean;
    invalidMessageMask: string;
  };
}

export type TNumericOptions = INumericMask | INonNumericMask;

export interface IGTInputMask extends IGTInput {
  mask: TNumericOptions;
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
}
