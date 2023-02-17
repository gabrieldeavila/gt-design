import React from "react";
import { Space } from "../../../components";
import BoxLoadingGroup from "../../../components/Box/Template/BoxLoadingGroup";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../gt";

export default {
  title: "Feedback/Skeletons/Boxes",
  args: {
    isLoading: true,
    boxes: 15,
  },
  argTypes: {
    isLoading: {
      control: "boolean",
      default: false,
    },
    boxes: {
      control: "number",
      default: 15,
    },
  },
};

const Template = ({
  isLoading,
  boxes,
}: {
  isLoading: boolean;
  boxes: number;
}) => {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="Boxes"
          subtitle="STORIES.SKELETONS.BOXES.SUBTITLE"
        />
        {isLoading ? <BoxLoadingGroup boxes={boxes} /> : "＞﹏＜"}
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Boxes = Template.bind({});
