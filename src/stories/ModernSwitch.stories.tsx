import React from "react";
import { Space } from "../components";
import GTNormalSwitch from "../components/Switch/Template/Normal";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "Data Entry/Switch/Modern Switch",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="Modern Switch"
          subtitle="STORIES.SWITCH.SUBTITLE"
        />
        <Space.Center>
          <GTNormalSwitch />
        </Space.Center>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const ModernSwitch = Template.bind({});
