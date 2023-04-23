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

export interface IGTLandingNavbar {
  logo: JSX.Element | string;
  options: () => JSX.Element;
}

export interface IGTLandingPageBasic extends IGTLandingNavbar {
  title: string;
  description: string;
  benefitDescription: string;
  benefits: IBenefit[];
  features: IGTLandingFeature[];
  footerDescription: string | JSX.Element;
}
