export interface IGTContext {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

interface IPageStateValues {
  [key: string]: string;
}

export interface IGTPageState {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  pageState: IPageStateValues;
  setPageState: React.Dispatch<React.SetStateAction<IPageStateValues>>;
  children?: React.ReactNode;
}
