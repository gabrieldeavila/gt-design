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

export interface ISectionContainer {
  title: string;
  subtitle: string;
}

export interface ITextDivider {
  children: React.ReactNode | JSX.Element[];
  color?: string;
  position?: "left" | "right" | "center";
}

interface DividerWrapperProps {
  after: string;
  before: string;
}
export interface ITextDividerWrapper {
  width: DividerWrapperProps;
}
