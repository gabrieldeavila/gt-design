import React from "react";
import { GTInput, Input, Space } from "../components";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Tooltip",
};

const Template = function TooltipStory() {
  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  return (
    <GTBasic>
      <Space.Horizontal>
        <Input.Group>
          <GTInput.Select row={4} title="wow such charm 🐲" text="what" label="Select" name="select" options={options} />
          <GTInput.Text
            row={4}
            text="change"
            defaultValidation
            validations={["noSpaces"]}
            name="nickname"
            label="TEMPLATE.LOGIN.NICKNAME_LABEL"
          />

          <GTInput.Email row={4} text="Email" name="email" label="TEMPLATE.LOGIN.EMAIL_LABEL" />

          <GTInput.Password row={8} text="EXAMPLE.TEXT" title="EXAMPLE.TITLE" name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />
        </Input.Group>
      </Space.Horizontal>

    </GTBasic>
  );
};

export const GTTooltip = Template.bind({});
