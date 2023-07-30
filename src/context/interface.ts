export interface IGTContext {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export interface IPageStateValues {
  [key: string | number]: string | number | boolean;
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

export type TToastTypes = "success" | "error" | "warning" | "info";

interface IToastOptions {
  duration?: number;
  type?: TToastTypes;
}

export interface IGTToast {
  message: string | JSX.Element;
  options: IToastOptions;
  id: number;
}

export interface IGTToastItem extends IGTToast {
  removeToast: (id: number) => void;
}

export type TToast = (
  message: string | JSX.Element,
  options: IToastOptions
) => number;

export interface IGTToastContext {
  toast: TToast;
  children?: React.ReactNode;
}

export interface IGTToastProvider {
  children?: React.ReactNode;
}
