import React from "react";
import { GTActiveSwitch } from "../components/Switch";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Switch",
  parameters: {
    layout: "centered",
  },
};

const Template = function SwitchStory() {
  return (
    <GTBasic>
      <GTActiveSwitch />
    </GTBasic>
  );
};

export const Active = Template.bind({});
