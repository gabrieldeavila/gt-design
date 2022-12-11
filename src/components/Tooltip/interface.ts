import { GTTheme } from "../../gt/Design/interface";

export interface ITeaserTip {
  parentRef: React.RefObject<HTMLElement>;
  title?: string;
  text?: string;
}

export interface ITooltipWrapper {
  top: number;
  left: number;
  theme: GTTheme;
  show: boolean;
}
