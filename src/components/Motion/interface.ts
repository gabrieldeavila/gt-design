import { IZinc } from "../Zinc/interface";

export interface IMotionBox extends IZinc {
  bg?: string;
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
}

export interface IMotionWrapper {
  span: number | string;
}
