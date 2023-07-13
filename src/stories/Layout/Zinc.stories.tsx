/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Space } from "../../components";
import Zinc from "../../components/Zinc/Zinc";
import { GTBasic } from "../../gt";

export default {
  title: "Layout/Zinc Temp",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <Zinc title="click to do something">zinc</Zinc>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const ZincTemp = Template.bind({});
