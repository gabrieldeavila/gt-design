import { FontWeightProps, TextAlignProps } from "styled-system";
import { IDefaultAddOns } from "../Space/interface";

export interface ITextBtn {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface IText extends IDefaultAddOns, TextAlignProps, FontWeightProps {}

export interface ISectionContainer {
  title: string;
  subtitle: string;
}

export interface ITextDivider {
  children?: React.ReactNode | JSX.Element[];
  text?: string;
  color?: string;
  position?: "left" | "right" | "center";
  hasMarginTop?: boolean;
}

interface DividerWrapperProps {
  after: string;
  before: string;
}
export interface ITextDividerWrapper {
  currWidth: DividerWrapperProps;
}
