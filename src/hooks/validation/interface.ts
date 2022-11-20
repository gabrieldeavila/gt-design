export interface IOptionRegex {
  regex: RegExp;
  message: string;
}

export interface IOptionsValidation {
  [key: string]: IOptionRegex;
}
