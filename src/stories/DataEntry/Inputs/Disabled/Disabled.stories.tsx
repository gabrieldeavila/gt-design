/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useMemo, useState } from "react";
import { GTInput, Input, Space } from "../../../../components";
import {
  INonNumericMask,
  INumericMask,
} from "../../../../components/Input/Fields/interface";
import SectionContainer from "../../../../components/Text/Template/SectionContainer";
import { IPageStateValues } from "../../../../context/interface";
import GTPageStateProvider from "../../../../context/pageState";
import { GTBasic } from "../../../../gt";

export default {
  title: "Data Entry/Inputs/Disabled",
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

const percentMask: INumericMask = {
  suffix: "%",
  prefix: "",
  thousandsSeparatorSymbol: ",",
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 4,
  allowNegative: false,
  type: "numeric_mask",
};

const phoneMask: INonNumericMask = {
  options: ["(99) 9999-9999", "(99) 99999-9999"],
  type: "non_numeric_mask",
};

const docMask: INonNumericMask = {
  options: ["999.999.999-99", "99.999.999/9999-99"],
  type: "non_numeric_mask",
};

const Template = () => {
  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  const [pageState, setPageState] = useState<IPageStateValues>({
    select: "G",
    NUMBER: 4,
    doc: "3_333___2_2",
    email: "myemail@gmail.com",
    nickname: "2222",
    percent: 69,
    phone: "5_7_99_3_5",
    price: 0.55,
    disabled: true,
  });

  const isDisabled = useMemo(() => !!pageState.disabled, [pageState.disabled]);

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
          <SectionContainer title="STORIES.INPUTS.DISABLED.TITLE" subtitle="STORIES.INPUTS.DISABLED.SUBTITLE" />
          <Input.Group>
            <GTInput.Switch label="EXAMPLE.DISABLED" name="disabled" />

            <GTInput.Select
              row={6}
              title="🐲"
              label="EXAMPLE.SELECT"
              name="select"
              options={options}
              disabled={isDisabled}
            />

            <GTInput.Text
              row={6}
              text="щ(ʘ╻ʘ)щ"
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
              disabled={isDisabled}
            />

            <GTInput.Email
              row={20}
              text="(￣、￣)"
              name="email"
              label="TEMPLATE.LOGIN.EMAIL_LABEL"
              disabled={isDisabled}
            />

            <GTInput.Number
              text="ಠ╭╮ಠ"
              min={1}
              max={5.2}
              row={5}
              name="NUMBER"
              label="EXAMPLE.NUMBER"
              disabled={isDisabled}
            />

            <GTInput.Mask
              title="（⊙ｏ⊙）"
              row={5}
              name="price"
              label="Money"
              mask={moneyMask}
              disabled={isDisabled}
            />

            <GTInput.Mask
              text="←_←"
              row={5}
              name="percent"
              title="wowww"
              label="EXAMPLE.PERCENT"
              mask={percentMask}
              disabled={isDisabled}
            />

            <GTInput.Mask
              title="(((φ(◎ロ◎;)φ)))"
              row={5}
              name="doc"
              label="EXAMPLE.DOC"
              mask={docMask}
              isGuided
              disabled={isDisabled}
            />

            <GTInput.Mask
              text="┌( ´_ゝ` )┐"
              row={5}
              name="phone"
              label="EXAMPLE.PHONE"
              mask={phoneMask}
              isGuided
              disabled={isDisabled}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Disabled = Template.bind({});
