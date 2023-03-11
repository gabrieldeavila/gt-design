/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Button, Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";

export default {
  title: "Data Entry/Buttons",
};

const ButtonTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Space.Modifiers
      p="1rem"
      gridGap="2rem"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Space.Modifiers
        width="20%"
        gridGap="1rem"
        flexWrap="wrap"
        alignItems="center"
        addOns={["mobile-100"]}
      >
        {children}
      </Space.Modifiers>
    </Space.Modifiers>
  );
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="STORIES.BUTTONS.TITLE"
          subtitle="STORIES.BUTTONS.SUBTITLE"
        />

        <Text.Divider position="left">Normal</Text.Divider>
        <ButtonTemplate>
          <Button.Normal>Normal</Button.Normal>
        </ButtonTemplate>

        <Text.Divider position="left">Contrast</Text.Divider>
        <ButtonTemplate>
          <Button.Contrast>Contrast</Button.Contrast>
        </ButtonTemplate>

        <Text.Divider position="left">Transparent</Text.Divider>

        <ButtonTemplate>
          <Button.Transparent>Transparent</Button.Transparent>
        </ButtonTemplate>

        <Text.Divider position="left">Success</Text.Divider>
        <ButtonTemplate>
          <Button.Success>Success</Button.Success>
        </ButtonTemplate>

        <Text.Divider position="left">Error</Text.Divider>
        <ButtonTemplate>
          <Button.Error>Error</Button.Error>
        </ButtonTemplate>

        <Space.Dashed my="5rem" />

        <Text.Divider position="left">Loading</Text.Divider>
        <ButtonTemplate>
          <Button.Normal isLoading>Loading</Button.Normal>
        </ButtonTemplate>

        <Space.Dashed my="5rem" />

        <Text.Divider position="left">Sizes</Text.Divider>
        <ButtonTemplate>
          <Button.Normal size="sm">Small</Button.Normal>
          <Button.Normal size="md">Medium</Button.Normal>
          <Button.Normal size="lg">Large</Button.Normal>
          <Button.Normal fitContent>Fit Content</Button.Normal>
        </ButtonTemplate>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Buttons = Template.bind({});
