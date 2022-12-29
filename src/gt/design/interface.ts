export interface GTTheme {
  primary: string;
  secondary: string;
  contrast: string;
  backgroundHover?: string;
  backgroundMobileNav?: string;
  sunColor?: string;
  moonColor?: string;
  errorColor?: string;
  btnShadow?: string;
  loginBoxPrimary?: string;
  glowShadow?: string;
  pageBackground: string;
  loginBackground1?: string;
  loginBackground2?: string;
  loginBackground3?: string;
  preSelectColor?: string;
  textBtn?: string;
  containerMain?: string;
  containerSecondary?: string;
  outline?: string;
  switchOn?: string;
  labelPrimary?: string;
  labelSecondary?: string;
}

// IGTDesign
export interface IGTDesign {
  children: React.ReactNode;
  theme?: GTTheme | false;
}
