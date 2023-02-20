/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { GTInput, Input, Space } from "../../../components";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../../../context/pageState";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Grid Form",
};

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <GTBasic>
      <GTPageStateProvider
        pageState={pageState}
        setPageState={setPageState}
        errors={errors}
        setErrors={setErrors}
      >
        <Space.Horizontal>
          <SectionContainer
            title="Select"
            subtitle="STORIES.INPUTS.TEXT.SUBTITLE"
          />
          <Input.Grid>
            <GTInput.Number
              row={3}
              text="щ(ʘ╻ʘ)щ"
              name="nickname"
              label="EXAMPLE.NUMBER"
            />
          </Input.Grid>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const GridForm = Template.bind({});
