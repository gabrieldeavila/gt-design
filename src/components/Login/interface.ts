import { IDefaultAddOns } from "../Space/interface";

export interface ILoginBoxPrimary {
  height: number;
}

export interface ILoginBoxMain extends IDefaultAddOns {
  isFirstRender?: boolean;
}
