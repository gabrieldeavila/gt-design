import React from "react";
import { GTActiveSwitch } from "../components/Switch";
import { GTBasic } from "../gt";
import { DEVONLY } from "../gt/Container/Container";

export default {
  title: "GTDesign/Switch",
  parameters: {
    layout: "centered",
  },
};

const Template = function SwitchStory() {
  return (
    <GTBasic>
      <DEVONLY>
        <GTActiveSwitch />
      </DEVONLY>
    </GTBasic>
  );
};

export const Active = Template.bind({});
