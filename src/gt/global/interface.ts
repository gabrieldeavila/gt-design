import { GTTheme } from "../Design/interface";

export interface IGLobalStyle {
  theme: GTTheme;
}

export interface IGTHandlers {
  children: React.ReactNode | JSX.Element[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
