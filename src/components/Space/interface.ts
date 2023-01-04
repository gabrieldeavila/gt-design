import { ColorProps, SpaceProps } from "styled-system";

type addOns = "center" | "middle" | "full-space";

export interface ISpace extends SpaceProps {
  addOns?: addOns[];
}

export interface ISpaceModifiers extends ISpace, ColorProps {
  type?: "column" | "row";
}

export interface IAddOns {
  [key: string]: string;
}
