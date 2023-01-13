/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Space, Text } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Text",
};

const Template = function StoryText() {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Text" subtitle="STORIES.TEXT.SUBTITLE" />
        <Text.Divider position="left">P</Text.Divider>
        <Text.P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text.P>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTText = Template.bind({});
