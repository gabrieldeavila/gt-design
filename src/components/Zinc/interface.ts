import { ISpace } from "../Space/interface";
import { StyledComponent } from "styled-components";

export interface IZincStyle {
  Wrapper: StyledComponent<"button", any, ISpace, never>;
}

export interface IZinc {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  text?: string;
}
