import { GTTheme } from "../../gt/Design/interface";

export interface IInputField {
  isLabel?: boolean;
}

export interface IInputContainer {
  isUp?: boolean;
  row?: number;
}

export interface ISelectValue {
  isSelected: boolean;
  isPreSelected: boolean;
  theme: GTTheme;
}
