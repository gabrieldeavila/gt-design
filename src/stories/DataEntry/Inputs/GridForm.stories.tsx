/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { GTInput, Space } from "../../../components";
import Grid from "../../../components/Grid";
import { INumericMask } from "../../../components/Input/Fields/interface";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../../../context/pageState";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Grid Form",
};

const moneyMask: INumericMask = {
  suffix: "",
  prefix: "US$  ",
  thousandsSeparatorSymbol: ",",
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: true,
  type: "numeric_mask",
};

const options = [
  { value: "B", label: "Bananas 🍌" },
  { value: "F", label: "Figs 🥝" },
  { value: "G", label: "Grapes 🍇" },
  { value: "H", label: "Honeydew melons 🍈" },
  { value: "I", label: "Ice cream 🍦" },
];

const Template = () => {
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
            subtitle="STORIES.INPUTS.TEXT.SUBTITLE"
          />
          <Grid.Form>
            <Grid.Item col={12}>
              <GTInput.Number
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.NUMBER"
              />
            </Grid.Item>
            <Grid.Item col={6}>
              <GTInput.Text
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.TEXT"
              />
            </Grid.Item>
            <Grid.Item col={6}>
              <GTInput.Mask
                title="（⊙ｏ⊙）"
                name="price"
                label="Money"
                mask={moneyMask}
              />
            </Grid.Item>
            <Grid.Item col={4}>
              <GTInput.Email
                text="(￣、￣)"
                name="email"
                label="TEMPLATE.LOGIN.EMAIL_LABEL"
              />
            </Grid.Item>

            <Grid.Item col={4}>
              <GTInput.Password
                text="←_←"
                name="password"
                label="TEMPLATE.LOGIN.PASSWORD_LABEL"
              />
            </Grid.Item>

            <Grid.Item col={4}>
              <GTInput.Select
                title="🐲"
                label="EXAMPLE.SELECT"
                name="select"
                options={options}
              />
            </Grid.Item>
          </Grid.Form>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const GridForm = Template.bind({});
