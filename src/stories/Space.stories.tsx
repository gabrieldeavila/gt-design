/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Space, Text } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Space",
};

const Template = function DamnSpace() {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Space" subtitle="STORIES.SPACE.SUBTITLE" />

        <Text.Divider position="left">Flex</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2"]}>
          <Space.Flex bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam.
          </Space.Flex>
        </Space.Modifiers>

        <Text.Divider position="left">FlexCenter</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2"]}>
          <Space.FlexCenter bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam.
          </Space.FlexCenter>
        </Space.Modifiers>

        <Text.Divider position="left">FullSpace</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2"]}>
          <Space.Flex bg="#87ceeb">
            <span style={{ background: "red" }}>deprecated-me!!!</span>
          </Space.Flex>
        </Space.Modifiers>

        <Text.Divider position="left">Center</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2"]}>
          <Space.Center bg="#87ceeb">deprecated-me!!!</Space.Center>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTSpace = Template.bind({});
