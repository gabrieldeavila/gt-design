/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { GTBasic } from "../../gt";
import Loading from "../../components/Loading/Loading";

export default {
  title: "Layout/Loading Story",
  argTypes: {
    show: {
      defaultValue: true,
      control: { type: "boolean" },
    },
  },
};

const Template = ({ show }: { show: boolean }) => {
  return (
    <GTBasic>
      <Loading show={show} />
    </GTBasic>
  );
};

export const LoadingStory = Template.bind({});
