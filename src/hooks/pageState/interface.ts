export type THandleBlurErrors = () => Promise<void>;

export type THandleInputChange = (
  newVal: string | number,
  isValid: boolean,
  invalidMessage?: string,
  errorsVar?: Object
) => void;

// this type extends the type THandleInputChange
export type THandleSwitch = (newVal: boolean) => void;
