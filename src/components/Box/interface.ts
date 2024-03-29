import { GTTheme } from "../../gt/Design/interface";

export interface IBoxWrapper {
  width?: number | string;
}

// IHandleColorContrastReceive should receive a bg with a string
export interface IHandleColorContrastReceive {
  bg?: string;
}

// IHandleColorContrastReturn should return a string
export type IHandleColorContrastReturn = string;

// BoxContainer will receive a bg with a string
export interface IBoxContainer {
  bg?: string;
  theme: GTTheme;
  isLoading?: boolean;
}

export interface IBoxLoadingGroup {
  boxes: number;
}
