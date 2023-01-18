import { GTTheme } from "../../gt/Design/interface";

export interface IInputField {
  isLabel?: boolean;
}

export interface IInputContainer {
  isUp?: boolean;
  row?: number;
  isLoading?: boolean;
}

export interface ISelectValue {
  isSelected: boolean;
  isPreSelected: boolean;
  theme: GTTheme;
}

export interface IIconWrapper {
  type: "center" | "top_right";
}
export interface IInputLabel {
  isWrong: boolean;
  up: boolean;
}

export interface ISelectOptionWrapper {
  isTop?: boolean;
}
