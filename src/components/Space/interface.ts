/* eslint-disable @typescript-eslint/indent */
import { FlattenSimpleInterpolation } from "styled-components";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
} from "styled-system";

export type TAddOns =
  | "center"
  | "middle"
  | "full-space"
  | "flex-end"
  | "pd-1"
  | "pd-2"
  | "pd-3"
  | "pd-4"
  | "pd-5"
  | "pt-1"
  | "pt-2"
  | "pt-3"
  | "pt-4"
  | "pt-5"
  | "pb-1"
  | "pb-2"
  | "pb-3"
  | "pb-4"
  | "pb-5"
  | "pl-1"
  | "pl-2"
  | "pl-3"
  | "pl-4"
  | "pl-5"
  | "pr-1"
  | "pr-2"
  | "pr-3"
  | "pr-4"
  | "pr-5"
  | "mt-1"
  | "mt-2"
  | "mt-3"
  | "mt-4"
  | "mt-5"
  | "mb-1"
  | "mb-2"
  | "mb-3"
  | "mb-4"
  | "mb-5"
  | "ml-1"
  | "ml-2"
  | "ml-3"
  | "ml-4"
  | "ml-5"
  | "mr-1"
  | "mr-2"
  | "mr-3"
  | "mr-4"
  | "mr-5"
  | "mg-1"
  | "mg-2"
  | "mg-3"
  | "mg-4"
  | "mg-5"
  | "w-10"
  | "w-20"
  | "w-30"
  | "w-40"
  | "w-50"
  | "w-60"
  | "w-70"
  | "w-80"
  | "w-90"
  | "w-100"
  | "gap-xs"
  | "gap-sm"
  | "gap-1"
  | "gap-2"
  | "gap-3"
  | "gap-4"
  | "gap-5"
  | "mobile-grow"
  | "mobile-100"
  | "flex-wrap"
  | "flex-grow"
  | "mx-1"
  | "mx-2"
  | "mx-3"
  | "mx-4"
  | "mx-5"
  | "my-1"
  | "my-2"
  | "my-3"
  | "my-4"
  | "my-5"
  | "px-1"
  | "px-2"
  | "px-3"
  | "px-4"
  | "px-5"
  | "py-1"
  | "py-2"
  | "py-3"
  | "py-4"
  | "py-5";

export interface ISpace extends SpaceProps, ColorProps, LayoutProps {
  addOns?: TAddOns[];
}

export interface ISpaceModifiers extends ISpace {
  type?: "column" | "row";
}

export interface IAddOns {
  [key: string]: string;
}

export interface IDefaultAddOns
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BackgroundProps,
    BorderProps,
    PositionProps,
    ShadowProps {}
