import React from "react";
import { GTBasic } from "../gt";
import { Skeletons } from "../components";

export default {
  title: "GTDesign/Skeletons",
  parameters: {
    layout: "centered",
  },
};

const Template = function Skeleton() {
  return (
    <GTBasic>
      <Skeletons.Input />
    </GTBasic>
  );
};

export const Skeleton = Template.bind({});
