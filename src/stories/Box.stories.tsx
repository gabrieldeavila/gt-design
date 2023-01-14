/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useMemo } from "react";
import { Box, MotionBox, Space, Text } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";
import { randomNumber } from "../utils";

export default {
  title: "Layout/Boxs",
};

const Template = () => {
  const emojis = useMemo(
    () => ["😖", "🥵", "👂", "🤝", "🫵", "🤖", "🥱", "🧌"],
    []
  );

  const words = useMemo(
    () => [
      "WoW",
      "Such a nice box",
      "I love it",
      "Mee what is this",
      "I want to do it",
      "We're no strangers to love",
      "You know the rules and so do I",
      "A full commitment's what I'm thinking of",
      "You wouldn't get this from any other guy",
      "I just wanna tell you how I'm feeling",
      "Gotta make you understand",
      "I will never",
      "Give you up",
      "If there's anything you need",
      "All you have to do is say",
    ],
    []
  );

  return (
    <GTBasic>
      <Space.Horizontal>
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
            "#00ffff",
            "#ff00ff",
          ].map((bg) => (
            <MotionBox bg={bg} key={bg}>
              <Space.MiddleCenter>
                <Text.P>{emojis[randomNumber(0, emojis.length - 1)]}</Text.P>
                <Text.P>{words[randomNumber(0, words.length - 1)]}</Text.P>
              </Space.MiddleCenter>
            </MotionBox>
          ))}
        </Box.Column>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Boxs = Template.bind({});
