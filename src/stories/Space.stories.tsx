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

        <Text.Divider position="left">Center</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2"]}>
          <Space.Center bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam.
          </Space.Center>
        </Space.Modifiers>

        <Text.Divider position="left">Dashed</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2", "full-space"]}>
          <Space.Dashed />
        </Space.Modifiers>

        <Text.Divider position="left">MiddleCenter</Text.Divider>
        <Space.Modifiers height={320} addOns={["mt-1", "mb-2", "w-100"]}>
          <Space.MiddleCenter bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.MiddleCenter>
        </Space.Modifiers>

        <Text.Divider position="left">Main</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2", "w-100"]}>
          <Space.Main bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.Main>
        </Space.Modifiers>

        <Text.Divider position="left">Horizontal</Text.Divider>
        <Space.Modifiers addOns={["mt-1", "mb-2", "w-100"]}>
          <Space.Horizontal bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.Horizontal>
        </Space.Modifiers>

        <Text.Divider position="left">Modifiers</Text.Divider>
        <Space.Modifiers addOns={["mt-2", "mb-5", "px-5", "py-2", "w-80"]} bg="#87ceeb">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTSpace = Template.bind({});
