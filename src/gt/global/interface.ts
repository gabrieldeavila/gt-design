import { GTTheme } from "../Design/interface";

export interface IGLobalStyle {
  theme: GTTheme;
}

export type onClickType = (
  e: React.MouseEvent<HTMLDivElement>
) => void | Promise<void>;

export type onChangeType = (
  e: React.ChangeEvent<HTMLInputElement>
) => void | Promise<void>;

export type onFocusType = (
  e: React.FocusEvent<HTMLInputElement>
) => void | Promise<void>;

export type onBlurType = (
  e: React.FocusEvent<HTMLInputElement>
) => void | Promise<void>;

export type onKeyPressType = (
  e: React.KeyboardEvent<HTMLInputElement>
) => void | Promise<void>;

export interface IGTHandlers {
  children: React.ReactNode | JSX.Element[];
  onClick?: onClickType;
  onChange?: onChangeType;
  onFocus?: onFocusType;
  onBlur?: onBlurType;
  onKeyPress?: onKeyPressType;
}
