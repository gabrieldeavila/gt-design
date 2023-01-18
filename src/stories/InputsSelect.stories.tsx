import React, { useMemo, useState } from "react";
import { GTInput, Input, Space } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "Data Entry/Inputs/Select",
  args: {
    isLoading: true,
  },
  argTypes: {
    position: {
      options: ["top", "bottom"],
      control: { type: "radio" },
    },
  },
};

type pos = {
  [key in "top" | "bottom"]: any;
};

const positionOptions: pos = {
  top: "0",
  bottom: "70vh",
};

const Template = ({ position }: { position: "top" | "bottom" }) => {
  const currPos = useMemo(() => positionOptions[position], [position]);

  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <GTBasic>
      <GTPageStateProvider
        pageState={pageState}
        setPageState={setPageState}
        errors={errors}
        setErrors={setErrors}
      >
        <Space.Horizontal>
          <SectionContainer
            title="Select"
            subtitle="STORIES.INPUTS.SELECT.SUBTITLE"
          />
          <Space.Modifiers mt={currPos} addOns={["middle"]}>
            <Input.Group>
              <GTInput.Select
                row={6}
                title="🐲"
                label="Select"
                name="select"
                options={options}
              />
            </Input.Group>
          </Space.Modifiers>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Select = Template.bind({});
