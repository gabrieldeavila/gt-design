import React from "react";
import { GTInput, Input } from "../components";
import { GTBasic } from "../gt";
import { DEVONLY } from "../gt/Container/Container";

export default {
  title: "GTDesign/Select",
  parameters: {
    layout: "centered",
  },
};

const Template = function SwitchStory() {
  const options = [
    { value: "B", label: "Bananas are great 🍌" },
    { value: "C", label: "Cucumbers are not great 🥒" },
    { value: "A", label: "Apples are great 🍎" },
    { value: "D", label: "Durians are not great 🍌" },
    { value: "E", label: "Eggplants are not great 🍆" },
    { value: "F", label: "Figs are not great 🥝" },
    { value: "G", label: "Grapes are not great 🍇" },
    { value: "H", label: "Honeydew melons are not great 🍈" },
    { value: "I", label: "Ice cream is not great 🍦" },
    { value: "J", label: "Jicama is not great 🥕" },
  ];

  return (
    <GTBasic>
      <DEVONLY>
        <Input.Group>
          <GTInput.Select label="Ma label" name="Ma name" options={options} />
        </Input.Group>
      </DEVONLY>
    </GTBasic>
  );
};

export const GTSelect = Template.bind({});
