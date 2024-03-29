import { GTTheme } from "../../gt/Design/interface";

export interface IGTTooltip {
  parentRef: React.RefObject<HTMLElement>;
  title?: string;
  text?: string;
}

export interface ITooltipWrapper {
  // top: number;
  // left: number;
  theme: GTTheme;
  // show: boolean;
  // isFirstRender: boolean;
  isAboveParent: boolean;
  // zIndex: number;
}

export interface IGTTooltipRef {
  show: () => void;
  hide: () => void;
}

export interface ITooltipContainer {
  isAboveParent: boolean;
}

export interface ITooltipContent {
  show: boolean;
  isAboveParent: boolean;
}
