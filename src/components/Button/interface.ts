import { ReactElement } from "react";
import { IGTHandlers } from "../../gt/Global/interface";

export interface IButton {
  disabled?: boolean;
  isLoading?: boolean;
  fitContent?: boolean;
  text?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  content?: string;
}

export interface IGTButton extends IButton, IGTHandlers {}

export interface IResetButton extends IGTButton {
  component: ReactElement<IGTButton>;
}
