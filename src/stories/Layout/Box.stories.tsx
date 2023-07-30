/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useMemo } from "react";
import { Box, MotionBox, Space, Text } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../gt";
import { randomNumber } from "../../utils";

export default {
  title: "Layout/Boxes",
};

const Template = () => {
  const emojis = useMemo(
    () => ["😖", "🥵", "👂", "🤝", "🫵", "🤖", "🥱", "🧌"],
    []
  );

  const words = useMemo(
    () => [
      "We're no strangers to love",
      "You know the rules and so do I",
      "A full commitment's what I'm thinking of",
      "You wouldn't get this from any other guy",

      "I just wanna tell you how I'm feeling",
      "Gotta make you understand",

      "Never gonna give you up",
      "Never gonna let you down",
      "Never gonna turn around and desert you",
      "Never gonna make you cry",
      "Never gonna say goodbye",
      "Never gonna tell a lie and hurt you",

      "We've known each other for so long",
      "Your heart's been aching",
      "But you're too shy to say it",
      "Inside we both know what's been going on",
      "We know the game and we're gonna play it",

      "And if you ask me how I'm feeling",
      "Don't tell me you're too blind to see",

      "Never gonna give you up",
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
          ].map((bg, index) => (
            <MotionBox title="NO_INITIAL_SPACE" bg={bg} key={bg}>
              <Space.MiddleCenter>
                <Text.P>{emojis[randomNumber(0, emojis.length - 1)]}</Text.P>
                <Text.P>{words[index]}</Text.P>
              </Space.MiddleCenter>
            </MotionBox>
          ))}
        </Box.Column>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Boxes = Template.bind({});
