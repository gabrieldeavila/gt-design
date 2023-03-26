import { IPageStateValues } from "../../context/interface";

export interface IGTEasyState {
  children?: React.ReactNode;
  initial?: IPageStateValues;
  name: string;
}
