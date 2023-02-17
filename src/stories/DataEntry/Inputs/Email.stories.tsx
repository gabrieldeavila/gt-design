/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useState } from "react";
import { GTInput, Input, Space } from "../../../components";
import { TBlurValidate } from "../../../components/Input/Fields/interface";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../../../context/pageState";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Email",
};

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleBlurValidate: TBlurValidate = useCallback(async (value) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const isValid = value === "gt@design.com";

        resolve([isValid, "INVALID_EMAIL", { EMAIL: "gt@design.com" }]);
      }, 200);
    });
  }, []);

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
          <Input.Group>
            <GTInput.Email
              row={6}
              text="щ(ʘ╻ʘ)щ"
              name="nickname"
              label="TEMPLATE.LOGIN.EMAIL_LABEL"
              onBlurValidate={handleBlurValidate}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Email = Template.bind({});
