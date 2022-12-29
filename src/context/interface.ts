export interface IGTContext {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export interface IPageStateValues {
  [key: string | number]: string | number;
}

export interface IGTPageState {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  pageState: IPageStateValues;
  setPageState: React.Dispatch<React.SetStateAction<IPageStateValues>>;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export interface IGTPageStateSetters {
  setPageState: React.Dispatch<React.SetStateAction<IPageStateValues>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading?: boolean;
  pageStateRef: React.RefObject<IPageStateValues>;
}
