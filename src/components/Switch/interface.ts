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

export interface INormalSwitchSlider {
  isChecked?: boolean;
}

export interface IGTNormalSwitch {
  name: string;
  isChecked: boolean;
  onSwitchChange: (newValue: boolean) => void;
  disabled?: boolean;
}
