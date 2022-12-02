import { GTTheme } from "../../gt/Design/interface";

export interface IInputField {
  isLabel?: boolean;
}

export interface IInputContainer {
  isUp?: boolean;
}

export interface ISelectValue {
  isSelected: boolean;
  theme: GTTheme;
}
