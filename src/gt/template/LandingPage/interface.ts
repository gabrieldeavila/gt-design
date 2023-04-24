export interface IGTLandingBenefit {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IBenefit extends IGTLandingBenefit {}

export interface IGTLandingFeature {
  title: string;
  description: string;
  component: JSX.Element;
}

export interface IFeature extends IGTLandingFeature {
  orientation: "left" | "right";
}

interface INavbarOptions {
  description: string;
  onClick: () => void;
}

export interface IGTLandingNavbar {
  logo: JSX.Element | string;
  options: INavbarOptions[];
  button: INavbarOptions;
}

interface ICallToAction {
  title: string;
  description: string;
  button: string;
}

export interface IGTLandingPageBasic {
  title: string;
  description: string;
  benefitDescription: string;
  benefits: IBenefit[];
  features: IGTLandingFeature[];
  callToAction: ICallToAction;
  footerDescription: string | JSX.Element | JSX.Element[];
  navbarOptions: IGTLandingNavbar;
}
