export interface ILogin {
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  canSave: boolean;
  loginRef: React.RefObject<HTMLDivElement>;
  onPasswordForgot?: () => void;
}
