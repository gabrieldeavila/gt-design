/* eslint-disable @typescript-eslint/indent */
import { ReactElement } from "react";
import { IGTHandlers } from "../../gt/Global/interface";
import { BackgroundColorProps, BackgroundProps } from "styled-system";
import { IDefaultAddOns, ISpace } from "../Space/interface";
import { StyledComponent } from "styled-components";

export interface IButton {
  disabled?: boolean;
  isLoading?: boolean;
  fitContent?: boolean;
  text?: string;
  title?: string;
  defaultSize?: "sm" | "md" | "lg";
  content?: string;
  symbol?: ReactElement;
  name?: string;
}

export interface IGTButton
  extends IButton,
    IGTHandlers,
    IDefaultAddOns,
    ISpace {}

export interface IResetButton extends IGTButton {
  component: ReactElement<IGTButton>;
}

export interface IGTButtonInitial
  extends IGTButton,
    BackgroundColorProps,
    BackgroundProps {
  name?: string;
}

export interface IGTButtonRef {
  ref?: React.RefObject<HTMLButtonElement>;
}

export interface IGTButtonStyle {
  Wrapper: StyledComponent<"div", any, ISpace, never>;
  Normal: (props: IGTButton) => JSX.Element;
  // using forwardRef
  Contrast: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<IGTButton> & React.RefAttributes<HTMLButtonElement>
  >;
  Transparent: (props: IGTButton) => JSX.Element;
  Success: (props: IGTButton) => JSX.Element;
  Error: (props: IGTButton) => JSX.Element;
  GitHub: (props: IGTButton) => JSX.Element;
  Google: (props: IGTButton) => JSX.Element;
  Initial: (props: IGTButton) => JSX.Element;
}
