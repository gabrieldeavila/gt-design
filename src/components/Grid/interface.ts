import { IDefaultAddOns } from "../Space/interface";

export interface IGridItem extends IDefaultAddOns {
  col?: number | string | undefined;
  mobileCol?: number | string | undefined;
}
