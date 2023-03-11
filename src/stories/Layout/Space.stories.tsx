/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";

export default {
  title: "Layout/Spaces",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Space" subtitle="STORIES.SPACE.SUBTITLE" />

        <Text.Divider position="left">Flex</Text.Divider>
        <Space.Modifiers mt="1rem" mb="2rem">
          <Space.Flex bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam.
          </Space.Flex>
        </Space.Modifiers>

        <Text.Divider position="left">Center</Text.Divider>
        <Space.Modifiers mt="1rem" mb="2rem">
          <Space.Center bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam.
          </Space.Center>
        </Space.Modifiers>

        <Text.Divider position="left">Dashed</Text.Divider>
        <Space.Modifiers mt="1rem" mb="2rem" addOns={["full-space"]}>
          <Space.Dashed />
        </Space.Modifiers>

        <Text.Divider position="left">MiddleCenter</Text.Divider>
        <Space.Modifiers height="320px" mt="1rem" mb="2rem" width="100%">
          <Space.MiddleCenter bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.MiddleCenter>
        </Space.Modifiers>

        <Text.Divider position="left">Main</Text.Divider>
        <Space.Modifiers mt="1rem" mb="2rem" width="100%">
          <Space.Main bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.Main>
        </Space.Modifiers>

        <Text.Divider position="left">Horizontal</Text.Divider>
        <Space.Modifiers mt="1rem" mb="2rem" width="100%">
          <Space.Horizontal bg="#87ceeb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.Horizontal>
        </Space.Modifiers>

        <Text.Divider position="left">Modifiers</Text.Divider>
        <Space.Modifiers height="300px" position="relative">
          <Space.Modifiers
            position="absolute"
            right="0"
            mb="1rem"
            mt="5rem"
            px="1rem"
            py="5rem"
            width="fit-content"
            bg="#87ceeb"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Space.Modifiers>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Spaces = Template.bind({});
