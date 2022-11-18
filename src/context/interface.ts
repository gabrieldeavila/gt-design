export interface IGTContext {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
