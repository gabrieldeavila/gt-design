import React from "react";
import { GTBasic } from "../../../gt";
import { GTBasicLandingPage } from "../../../gt/Template/LandingPage";

export default {
  title: "Templates/LandingPage/Basic",
};

const Template = () => {
  return (
    <GTBasic>
      <GTBasicLandingPage />
    </GTBasic>
  );
};

export const Basic = Template.bind({});
