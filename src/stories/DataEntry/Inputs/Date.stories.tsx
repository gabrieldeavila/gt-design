/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { GTInput, Input, Space } from "../../../components";
import GTEasyState from "../../../components/EasyState/GTEasyState";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Date",
};

const Template = () => {
  return (
    <GTBasic>
      <GTEasyState name="date">
        <Space.Horizontal>
          <SectionContainer
            title="Date"
            subtitle="STORIES.INPUTS.DATE.SUBTITLE"
          />
          <Input.Group>
            <GTInput.Date
              min="2023-03-10"
              max="2023-03-31"
              name="date"
              label="EXAMPLE.DATE"
            />
          </Input.Group>
        </Space.Horizontal>
      </GTEasyState>
    </GTBasic>
  );
};

export const Date = Template.bind({});
