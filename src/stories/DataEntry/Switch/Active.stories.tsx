import React, { useCallback } from "react";
import { Space } from "../../../components";
import { GTActiveSwitch } from "../../../components/Switch";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Switch/Active",
};

const Template = () => {
  const handleChange = useCallback((e: boolean) => {
    console.log("SWITCH VALUE", e);
  }, []);

  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Switch" subtitle="STORIES.SWITCH.SUBTITLE" />
        <Space.Center>
          <GTActiveSwitch isChecked onChange={handleChange} />
        </Space.Center>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Active = Template.bind({});
