export interface IGTInput {
  name: string;
  label: string;
  validations: string[];
  defaultValidation: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IGTInputText extends IGTInput {
  minWords?: number | string;
  maxWords?: number | string;
  minChars?: number | string;
  maxChars?: number | string;
}

export interface IGTInputPassword extends IGTInput {
  sameAs?: string;
}

interface SelectionOptions {
  value: string;
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
}

export interface ISelectContext {
  value: string;
}
