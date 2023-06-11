type orientationX = "left" | "right" | "center";
type orientationY = "top" | "bottom" | "center";

export interface IModal {
  isOpen?: boolean;
  currOrientationX?: orientationX;
  currOrientationY?: orientationY;
}

export interface IModalData {
  title: string;
  content?: string;
  orientationX?: orientationX;
  orientationY?: orientationY;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  onBeforeConfirm?: () => Promise<boolean>;
  onConfirm?: () => void;
  onBeforeCancel?: () => Promise<boolean>;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface IGTModal {
  show: boolean;
  setShow: (show: boolean) => void;
  data: IModalData;
  children?: React.ReactNode | React.ReactNode[];
}
