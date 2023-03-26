/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from "react";
import { useTriggerState } from "react-trigger-state";
import { Button, GTInput, Space } from "../../../components";
import GTEasyState from "../../../components/EasyState/GTEasyState";
import Grid from "../../../components/Grid";
import {
  INonNumericMask,
  INumericMask,
} from "../../../components/Input/Fields/interface";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/EasyState",
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
  const [state] = useTriggerState({
    name: "story_easy_state",
  });

  const [canSave] = useTriggerState({
    name: "story_easy_state_can_save",
  });

  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <GTBasic>
      <GTEasyState name="story_easy_state">
        <Space.Horizontal>
          <SectionContainer
            title="Easy State"
            subtitle="STORIES.EASY_STATE.SUBTITLE"
          />
          <Grid.Form>
            <Grid.Item col={1}>
              <Space.Center height="57px">
                <GTInput.Switch
                  flexJustify="center"
                  label="EXAMPLE.SWITCH"
                  name="selected"
                />
              </Space.Center>
            </Grid.Item>

            <Grid.Item col={5}>
              <GTInput.Select
                title="🐲"
                label="EXAMPLE.SELECT"
                name="select"
                options={options}
              />
            </Grid.Item>
            <Grid.Item col={6}>
              <GTInput.Text
                text="щ(ʘ╻ʘ)щ"
                validations={["noSpaces"]}
                name="nickname"
                label="TEMPLATE.LOGIN.NICKNAME_LABEL"
              />
            </Grid.Item>

            <Grid.Item col={6}>
              <GTInput.Email
                text="(￣、￣)"
                name="email"
                label="TEMPLATE.LOGIN.EMAIL_LABEL"
              />
            </Grid.Item>

            <Grid.Item col={6}>
              <GTInput.Number
                text="ಠ╭╮ಠ"
                min={1}
                max={5.2}
                name="NUMBER"
                label="EXAMPLE.NUMBER"
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

            <Grid.Item col={6}>
              <GTInput.Mask
                text="←_←"
                name="percent"
                title="wowww"
                label="EXAMPLE.PERCENT"
                mask={percentMask}
              />
            </Grid.Item>

            <Grid.Item col={6}>
              <GTInput.Mask
                title="(((φ(◎ロ◎;)φ)))"
                name="doc"
                label="EXAMPLE.DOC"
                mask={docMask}
                isGuided
              />
            </Grid.Item>

            <Grid.Item col={6}>
              <GTInput.Mask
                text="┌( ´_ゝ` )┐"
                name="phone"
                label="EXAMPLE.PHONE"
                mask={phoneMask}
                isGuided
              />
            </Grid.Item>
          </Grid.Form>

          <Space.Modifiers mt="2rem">
            <Button.Normal>
              {canSave ? "EXAMPLE.CAN_SAVE" : "EXAMPLE.CANNOT_SAVE"}
            </Button.Normal>
          </Space.Modifiers>
        </Space.Horizontal>
      </GTEasyState>
    </GTBasic>
  );
};

export const EasyState = Template.bind({});
