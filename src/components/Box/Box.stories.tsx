import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import GTBasic from "../../gt/template/Basic";
import MotionBox from "../Motion/motionBox";

import Box from "./Box";

function BoxStory() {
  return (
    <GTBasic>
      <Box.Column>
        {[
          "#e0ffff",
          "#98fb98",
          "black",
          "white",
          "#a0d6b4",
          "#66ddaa",
          "#00a693",
          "#00a86b",
          "#ffddf4",
          "#7cfc00",
          "#cae00d",
          "#db7093",
          "#7b68ee",
          "#8a2be2",
          "#4b0082",
          "#008080",
          "#00ced1",
          "#00bfff",
          "#00ffff",
          "#ff00ff",
        ].map((bg) => (
          <MotionBox bg={bg} key={bg} />
        ))}
      </Box.Column>
    </GTBasic>
  );
}

export default {
  title: "GTDesign/Box",
  component: BoxStory,
} as ComponentMeta<typeof BoxStory>;

const Template: ComponentStory<typeof BoxStory> = (args) => <BoxStory />;

export const GTBox = Template.bind({});
