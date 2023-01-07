/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Button, Space } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Buttons",
};

const Template = function BoxStory() {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Buttons" subtitle="STORIES.BUTTONS.SUBTITLE" />
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Normal>✍️(◔◡◔)</Button.Normal>
          </Space.Modifiers>

          <Space.Modifiers addOns={["w-10", "mobile-100"]}>
            <Button.Normal>(•ˋ _ ˊ•)</Button.Normal>
          </Space.Modifiers>

          <Space.Modifiers addOns={["w-20", "mobile-grow"]}>
            <Button.Normal>╰（‵□′）╯</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>

        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Normal>✍️(◔◡◔)</Button.Normal>
          </Space.Modifiers>

          <Space.Modifiers addOns={["w-10", "mobile-100"]}>
            <Button.Normal>(•ˋ _ ˊ•)</Button.Normal>
          </Space.Modifiers>

          <Space.Modifiers addOns={["w-20", "mobile-grow"]}>
            <Button.Normal>╰（‵□′）╯</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTButton = Template.bind({});
