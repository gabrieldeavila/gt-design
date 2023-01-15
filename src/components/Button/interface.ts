import { IGTHandlers } from "../../gt/Global/interface";

export interface IButton {
  disabled?: boolean;
  isLoading?: boolean;
  fitContent?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface IGTButton extends IButton, IGTHandlers {}
