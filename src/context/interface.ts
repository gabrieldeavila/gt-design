export interface IGTContext {
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
  children?: React.ReactNode;
}
