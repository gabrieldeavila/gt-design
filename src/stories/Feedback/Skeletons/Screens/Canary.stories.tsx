import React from "react";
import { Space } from "../../../../components";
import SectionContainer from "../../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../../gt";
import { Canary } from "../../../../components/Skeleton/Page";

export default {
  title: "Feedback/Skeletons/Screens/_Canary",
};

const Template = () => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="Canary"
          subtitle="STORIES.SKELETONS.SCREENS.CANARY.SUBTITLE"
        />
        <Canary />
      </Space.Horizontal>
    </GTBasic>
  );
};

export const _Canary = Template.bind({});
