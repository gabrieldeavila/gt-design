import { ColorProps, FlexboxProps, SpaceProps } from "styled-system";

export interface INavbarWrapper extends ColorProps, SpaceProps, FlexboxProps {
  show: boolean;
  isInTop: boolean;
}

export interface INavbarOptions extends SpaceProps {
  top?: number;
}

export interface IGTNavbarOptions {
  children: React.ReactNode;
}

export interface IGTNavbarOption {
  children?: React.ReactNode;
  name: string;
  icon?: React.ReactNode;
  onClick?: (e: any, name: string) => void;
}

export interface IGTNavbarMobileOptions {
  children: React.ReactNode | JSX.Element[];
}
