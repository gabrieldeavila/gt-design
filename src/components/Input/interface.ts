import { GTTheme } from "../../gt/Design/interface";

export interface IInputField {
  isLabel?: boolean;
}

export interface IInputContainer {
  isUp?: boolean;
  row?: number;
  isLoading?: boolean;
  isWrong?: boolean;
  flexJustify?: string;
  disabled?: boolean;
}

export interface ISelectValue {
  isSelected: boolean;
  isPreSelected: boolean;
  theme: GTTheme;
}

export interface IIconWrapper {
  showOpacity?: boolean;
}

export interface IInputLabel {
  theme: GTTheme;
  isWrong?: boolean;
  up: boolean;
  isRequired?: boolean;
}

export interface ISelectOptionWrapper {
  isTop?: boolean;
}

interface errorParams {
  [key: string]: string;
}

export interface IErrorMessage {
  message: string;
  isWrong: boolean;
  params?: errorParams;
}
