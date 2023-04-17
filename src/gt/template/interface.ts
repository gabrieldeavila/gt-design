export interface ILogin {
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  canSave: boolean;
  loginRef: React.RefObject<HTMLDivElement>;
  onPasswordForgot?: () => void;
  isFirstRender?: boolean;
}

type options = "google" | "github";

export interface ILoginProvider
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hide?: options[];
  onGoogleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onGitHubClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
