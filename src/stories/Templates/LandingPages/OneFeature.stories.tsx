import React from "react";
import { Clock, Edit3, Tool } from "react-feather";
import { EasyState, GTInput, Input } from "../../../components";
import { GTBasic } from "../../../gt";
import { GTBasicLandingPage } from "../../../gt/Template/LandingPage";
import {
  IGTLandingBenefit,
  IGTLandingFeature,
  IGTLandingNavbar,
} from "../../../gt/Template/LandingPage/interface";
import { autoUpdateTheme } from "../../../utils/colors";

export default {
  title: "Templates/LandingPage/One Feature",
};

const navbarOptions: IGTLandingNavbar = {
  logo: "GT",
  button: {
    description: "TEMPLATE.LANDING_PAGE.LOG_IN",
    onClick: () => console.log("button"),
  },
  options: [
    { description: "Docs", onClick: () => console.log("docs") },
    { description: "GitHub", onClick: () => console.log("GitHub") },
    { description: "npm", onClick: () => console.log("npm") },
  ],
};

const Benefits: IGTLandingBenefit[] = [
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.SAVE_TIME.TITLE",
    description: "TEMPLATE.LANDING_PAGE.BENEFITS.SAVE_TIME.DESCRIPTION",
    icon: <Clock />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.IMPROVE_EFFICIENCY.TITLE",
    description:
      "TEMPLATE.LANDING_PAGE.BENEFITS.IMPROVE_EFFICIENCY.DESCRIPTION",
    icon: <Tool />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.ENHANCE_OUTCOMES.TITLE",
    description: "TEMPLATE.LANDING_PAGE.BENEFITS.ENHANCE_OUTCOMES.DESCRIPTION",
    icon: <Edit3 />,
  },
];

const Features: IGTLandingFeature[] = [
  {
    component: <ExampleTheming />,
  },
];

const callToAction = {
  title: "TEMPLATE.LANDING_PAGE.ACTION.TITLE",
  description: "TEMPLATE.LANDING_PAGE.ACTION.DESCRIPTION",
  button: {
    onClick() {
      console.log("clicked");
    },
    title: "TEMPLATE.LANDING_PAGE.ACTION.GET_STARTED",
  },
};

const Template = () => {
  return (
    <GTBasic>
      <GTBasicLandingPage
        navbarOptions={navbarOptions}
        title="GT Design"
        description="TEMPLATE.LANDING_PAGE.DESCRIPTION"
        benefitDescription="TEMPLATE.LANDING_PAGE.BENEFITS.DESCRIPTION"
        benefits={Benefits}
        features={Features}
        callToAction={callToAction}
        footerDescription="TEMPLATE.LANDING_PAGE.FOOTER.DESCRIPTION"
      />
    </GTBasic>
  );
};

export const OneFeature = Template.bind({});

function ExampleTheming() {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
      autoUpdateTheme({
        keyToUpdate: name,
        newColor: e.target.value,
      });
    },
    []
  );

  return (
    <EasyState name="example-theming" initial={{ email: "" }}>
      <Input.Group>
        <GTInput.Color
          row={12}
          name="primary"
          label="Primary"
          onChange={handleChange}
        />

        <GTInput.Color
          row={12}
          name="secondary"
          label="Secondary"
          onChange={handleChange}
        />
      </Input.Group>
    </EasyState>
  );
}
