import { FontWeightProps, TextAlignProps } from "styled-system";
import { IDefaultAddOns } from "../Space/interface";
import { StyledComponent } from "styled-components";

export interface ITextBtn {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface IText
  extends IDefaultAddOns,
    TextAlignProps,
    FontWeightProps {}

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

// export interface ITextStyle {
//   P: StyledComponent<"p", any, IText, never>;
//   H1: StyledComponent<"h1", any, IText, never>;
//   H2: StyledComponent<"h2", any, IText, never>;
//   Strong: StyledComponent<"h2", any, IText, never>;
//   // Btn: memo()
//   // is a memo function that returns a component
//   Btn: (props: ITextBtn) => JSX.Element;
//   Divider:(props: ITextBtn) => JSX.Element
//   Title: TextTitle,
//   Subtitle: TextSubtitle,
//   Action: TextAction,
// };
