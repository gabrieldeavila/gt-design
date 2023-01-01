export interface ISwitch {
  fixed?: boolean | undefined;
  placeX?: string | undefined;
  placeY?: string | undefined;
  mode?: string | undefined;
  checked?: boolean | undefined;
}

export interface ISwitchInput {
  mode?: string;
}

export interface IGTActiveSwitch {
  isChecked?: boolean;
  onChange?: (newValue: boolean) => void;
}
