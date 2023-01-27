export interface IOptionRegex {
  regex: RegExp;
  message: string;
}

export interface IOptionsValidation {
  [key: string]: IOptionRegex;
}

export type TValidateState = (isValid: boolean, value: string | number) => void;
