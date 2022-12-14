import React, { useCallback } from "react";
import { Space } from "../components";
import { GTActiveSwitch } from "../components/Switch";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Switch",
};

const Template = function SwitchStory() {
  const handleChange = useCallback((e: boolean) => {
    console.log("SWITCH VALUE", e);
  }, []);

  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Switch" subtitle="STORIES.SWITCH.SUBTITLE" />
        <Space.FlexCenter>
          <GTActiveSwitch isChecked onChange={handleChange} />
        </Space.FlexCenter>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Active = Template.bind({});
