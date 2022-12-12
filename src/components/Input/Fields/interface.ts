export interface IGTInput {
  name: string;
  label: string;
  validations: string[];
  defaultValidation: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  text?: string;
  row?: number;
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
}
