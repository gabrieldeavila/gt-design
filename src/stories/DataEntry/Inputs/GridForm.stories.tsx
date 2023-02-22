/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { GTInput, Space } from "../../../components";
import Grid from "../../../components/Grid";
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
          <Grid.Form>
            <Grid.Item col={2}>
              <GTInput.Number
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.NUMBER"
              />
            </Grid.Item>
            <Grid.Item col={3}>
              <GTInput.Number
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.NUMBER"
              />
            </Grid.Item>
            <Grid.Item col={5}>
              <GTInput.Number
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.NUMBER"
              />
            </Grid.Item>
            <Grid.Item col={2}>
              <GTInput.Number
                text="щ(ʘ╻ʘ)щ"
                name="nickname"
                label="EXAMPLE.NUMBER"
              />
            </Grid.Item>
          </Grid.Form>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const GridForm = Template.bind({});
