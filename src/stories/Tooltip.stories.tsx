import React, { useState } from "react";
import { GTInput, Input, Space } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "Data Display/Tooltips",
};

const Template = () => {
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
            title="Tooltips"
            subtitle="STORIES.TOOLTIP.SUBTITLE"
          />
          <Input.Group>
            <GTInput.Select
              row={6}
              text="EXAMPLE.TEXT"
              title="EXAMPLE.TITLE"
              label="EXAMPLE.SELECT"
              name="select"
              options={options}
            />

            <GTInput.Text
              row={6}
              text="EXAMPLE.TITLE"
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Email
              row={21}
              title="EXAMPLE.TITLE"
              name="email"
              label="TEMPLATE.LOGIN.EMAIL_LABEL"
            />

            <GTInput.Password
              row={5}
              text="EXAMPLE.TEXT"
              title="EXAMPLE.TITLE"
              name="password"
              label="TEMPLATE.LOGIN.PASSWORD_LABEL"
            />

            <GTInput.Number
              min={1}
              max={5.2}
              row={5}
              title="EXAMPLE.TITLE"
              name="number"
              label="Number"
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Tooltips = Template.bind({});
