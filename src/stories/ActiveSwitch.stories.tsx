import React from "react";
import { GTActiveSwitch } from "../components/Switch";

export default {
  title: "GTDesign/Switch",
  parameters: {
    layout: "centered",
  },
  argTypes: { onClick: { action: "clicked" } },
};

const Template = function SwitchStory() {
  return (
    <GTActiveSwitch />
  );
};

export const Active = Template.bind({});
