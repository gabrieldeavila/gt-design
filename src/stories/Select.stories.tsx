import React from "react";
import { GTInput, Input, Space } from "../components";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Select",
};

const Template = function SwitchStory() {
  const options = [
    { value: "PCC", label: "PRODUCTS_DO_YOU_REMEMBER_THE_BUG_NOW" },
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
    { value: "Ç", label: "Junin Caçalha Suíça" },
    { value: "EÇA", label: "Eça de Queiroz 🥝" },
    { value: "PV", label: "PRODUCTS VENDAS SUPER VENDAS" },
    { value: "PC", label: "PRODUCTS VENDAS" },
  ];

  return (
    <GTBasic>
      <Space.Horizontal>
        <Input.Group>
          <GTInput.Select
            row={6}
            label="Select"
            name="select"
            options={options}
          />
        </Input.Group>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTSelect = Template.bind({});
