import { ReactElement } from "react";
import { IGTHandlers } from "../../gt/Global/interface";
import { BackgroundColorProps, BackgroundProps } from "styled-system";
import { IDefaultAddOns } from "../Space/interface";

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

export interface IGTButton extends IButton, IGTHandlers, IDefaultAddOns {}

export interface IResetButton extends IGTButton {
  component: ReactElement<IGTButton>;
}

export interface IGTButtonInitial extends IGTButton, BackgroundColorProps, BackgroundProps {
  name?: string;
}
