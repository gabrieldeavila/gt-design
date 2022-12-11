import React from "react";
import { GTInput, Input } from "../components";
import { GTBasic } from "../gt";
import { DEVONLY } from "../gt/Container/Container";

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
      <DEVONLY>
        <Input.Group>
          <GTInput.Select title="wow such charm 🐲" text="what" label="Select" name="select" options={options} />
          <GTInput.Text
            text="change"
            defaultValidation
            validations={["noSpaces"]}
            name="nickname"
            label="TEMPLATE.LOGIN.NICKNAME_LABEL"
          />

          <GTInput.Email text="Email" name="email" label="TEMPLATE.LOGIN.EMAIL_LABEL" />

          <GTInput.Password text="EXAMPLE.TEXT" title="EXAMPLE.TITLE" name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />
        </Input.Group>
      </DEVONLY>
    </GTBasic>
  );
};

export const GTTooltip = Template.bind({});
