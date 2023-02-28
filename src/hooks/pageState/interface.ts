export type THandleBlurErrors = () => Promise<void>;

export type THandleInputChange = (
  newVal: string | number | boolean,
  isValid: boolean,
  invalidMessage?: string,
  errorsVar?: Object
) => void;
