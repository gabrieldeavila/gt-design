/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { GTBasic } from "../../gt";
import Loading from "../../components/Loading/Loading";

export default {
  title: "Layout/Loading Story",
};

const Template = () => {
  return (
    <GTBasic>
      <Loading />
    </GTBasic>
  );
};

export const LoadingStory = Template.bind({});
