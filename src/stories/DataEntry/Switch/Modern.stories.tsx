import React from "react";
import { Space } from "../../../components";
import GTNormalSwitch from "../../../components/Switch/Template/Normal";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Switch/Modern",
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
          <GTNormalSwitch
            isChecked
            name="switch"
            onSwitchChange={() => {
              console.log("changed!");
            }}
          />
        </Space.Center>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Modern = Template.bind({});
