export interface IPopupWrapper {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  avoidComponents: Array<React.RefObject<HTMLElement>>;
}

export interface IGTSymbolPopup {
  children: JSX.Element[];
  alt: string;
  img?: string;
}
