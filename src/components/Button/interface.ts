import { IGTHandlers } from "../../gt/Global/interface";

export interface IButton {
  disabled?: boolean;
  isLoading?: boolean;
}

export interface IGTButton extends IButton, IGTHandlers {}
