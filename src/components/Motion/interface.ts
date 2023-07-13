export interface IMotionBox {
  bg?: string;
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  title?: string;
  text?: string;
}

export interface IMotionWrapper {
  span: number | string;
}
