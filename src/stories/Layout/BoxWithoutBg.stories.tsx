/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Box, MotionBox, Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";

export default {
  title: "Layout/Boxs Without Bg",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Box" subtitle="STORIES.BOX.SUBTITLE" />
        <Box.Column>
          <MotionBox>
            <Space.MiddleCenter>
              <Text.P>👨‍💻</Text.P>
            </Space.MiddleCenter>
          </MotionBox>

          <MotionBox>
            <Space.MiddleCenter>
              <Text.P>👨‍💻</Text.P>
            </Space.MiddleCenter>
          </MotionBox>
        </Box.Column>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const BoxsWithoutBg = Template.bind({});
