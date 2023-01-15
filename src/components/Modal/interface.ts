type orientationX = "left" | "right" | "center";
type orientationY = "top" | "bottom" | "center";

export interface IModal {
  isOpen?: boolean;
  currOrientationX?: orientationX;
  currOrientationY?: orientationY;
}

export interface IModalData {
  title: string;
  content: string;
  orientationX?: orientationX;
  orientationY?: orientationY;
  confirmText?: string;
  cancelText?: string;
  closeDefault?: boolean;
  escClose?: boolean;
  footer?: React.ReactNode;
  closable?: boolean;
  afterClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface IGTModal {
  show: boolean;
  setShow: (show: boolean) => void;
  data: IModalData;
}
