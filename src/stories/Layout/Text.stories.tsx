/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";

export default {
  title: "Layout/Texts",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Text" subtitle="STORIES.TEXT.SUBTITLE" />
        <Space.Modifiers mt="-1.75rem" type="column">
          <div>
            <Text.Divider position="left">P</Text.Divider>
            <Text.P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </Text.P>
          </div>

          <div>
            <Text.Divider position="left">H1</Text.Divider>
            <Text.H1>Lorem ipsum</Text.H1>
          </div>

          <div>
            <Text.Divider position="left">H2</Text.Divider>
            <Text.H2>Lorem ipsum</Text.H2>
          </div>

          <div>
            <Text.Divider position="left">Btn</Text.Divider>
            <Text.Btn>Lorem ipsum</Text.Btn>
          </div>

          <div>
            <Text.Divider position="left">Strong</Text.Divider>
            <Text.Strong>Lorem ipsum</Text.Strong>
          </div>

          <div>
            <Text.Divider position="left">Divider</Text.Divider>
            <Text.Divider>Divider</Text.Divider>
          </div>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Texts = Template.bind({});
