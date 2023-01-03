import React from "react";
import { Box, GTNavbar, MotionBox, Space } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Navbar",
};

const Template = function NavbarStory() {
  return (
    <GTBasic>
      <GTNavbar showModal />
      <Space.Main>
        <SectionContainer title="Box" subtitle="STORIES.BOX.SUBTITLE" />
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
            "#00bfff",
            "#00bfff",
            "#00bfff",
            "#00ffff",
            "#00ffff",
            "#ff00ff",
          ].map((bg) => (
            <MotionBox bg={bg} key={bg}>
              （⊙ｏ⊙）
            </MotionBox>
          ))}
        </Box.Column>
      </Space.Main>
    </GTBasic>
  );
};

export const Navbar = Template.bind({});
