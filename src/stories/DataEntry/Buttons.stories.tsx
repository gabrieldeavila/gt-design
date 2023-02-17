/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Button, Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";

export default {
  title: "Data Entry/Buttons",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Buttons" subtitle="STORIES.BUTTONS.SUBTITLE" />

        <Text.Divider position="left">Normal</Text.Divider>

        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Normal>Normal</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.Divider position="left">Contrast</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Contrast>Contrast</Button.Contrast>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.Divider position="left">Transparent</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Transparent>Transparent</Button.Transparent>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.Divider position="left">Success</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Success>Success</Button.Success>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.Divider position="left">Error</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Error>Error</Button.Error>
          </Space.Modifiers>
        </Space.Modifiers>

        <Space.Dashed addOns={["my-5"]} />

        <Text.Divider position="left">Loading</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Normal isLoading>Loading</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>

        <Space.Dashed addOns={["my-5"]} />

        <Text.Divider position="left">Sizes</Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "gap-2", "mobile-100"]}>
            <Button.Normal size="sm">Small</Button.Normal>
            <Button.Normal size="md">Medium</Button.Normal>
            <Button.Normal size="lg">Large</Button.Normal>
            <Button.Normal fitContent>Fit Content</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Buttons = Template.bind({});
