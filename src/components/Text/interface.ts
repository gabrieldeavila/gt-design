import { FontSizeProps, SpaceProps } from "styled-system";

export interface ITextBtn {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface IText extends SpaceProps, FontSizeProps {}

export interface ITextP extends IText {
  sm?: boolean;
}
