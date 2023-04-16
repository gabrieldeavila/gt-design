import { ReactElement } from "react";
import { IGTHandlers } from "../../gt/Global/interface";
import { BackgroundColorProps, BackgroundProps } from "styled-system";

export interface IButton {
  disabled?: boolean;
  isLoading?: boolean;
  fitContent?: boolean;
  text?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  content?: string;
  symbol?: ReactElement;
  name?: string;
}

export interface IGTButton extends IButton, IGTHandlers {}

export interface IResetButton extends IGTButton {
  component: ReactElement<IGTButton>;
}

export interface IGTButtonInitial extends IGTButton, BackgroundColorProps, BackgroundProps {
  name?: string;
}
