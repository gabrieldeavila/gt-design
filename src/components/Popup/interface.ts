interface IPopupWrapper {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  avoidComponents: React.RefObject<HTMLElement>[];
}
