import React, { useState } from "react";
import { GTInput, Input, Space } from "../components";
import { INumericMask } from "../components/Input/Fields/interface";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Tooltip",
};

const numericMask: INumericMask = {
  suffix: "",
  prefix: "R$ ",
  thousandsSeparatorSymbol: ".",
  decimalSymbol: ",",
  decimalLimit: 2,
  integerLimit: 4,
  allowNegative: false,
  allowLeadingZeroes: false,
  type: "numeric_mask"
};

const Template = function TooltipStory() {
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
          <Input.Group>
            <GTInput.Select row={2} title="wow such charm 🐲" text="what" label="Select" name="select" options={options} />
            <GTInput.Text
              row={2}
              text="change"
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Email row={2} text="Email" name="email" label="TEMPLATE.LOGIN.EMAIL_LABEL" />

            <GTInput.Password row={5} text="EXAMPLE.TEXT" title="EXAMPLE.TITLE" name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />

            <GTInput.Number min={1} max={5.2} row={5} text="EXAMPLE.TEXT" title="EXAMPLE.TITLE" name="NUMBER" label="És uno numero!" />

            <GTInput.NumericMask name="price" label="Lá máscarada!" mask={numericMask} />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const GTTooltip = Template.bind({});
