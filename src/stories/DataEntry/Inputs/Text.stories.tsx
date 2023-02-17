/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useState } from "react";
import { GTInput, Input, Space } from "../../../components";
import { TChangeValidate } from "../../../components/Input/Fields/interface";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../../../context/pageState";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Text",
};

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleChangeValidate: TChangeValidate = useCallback((value) => {
    let isValid = true;
    let errorMsg = "";
    let errorParams = {};

    if (value !== "gt") {
      isValid = false;
      errorMsg = "INVALID_NICKNAME";
      errorParams = { NICKNAME: "gt" };
    }

    return [isValid, errorMsg, errorParams];
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
            title="Text"
            subtitle="STORIES.INPUTS.TEXT.SUBTITLE"
          />
          <Input.Group>
            <GTInput.Text
              row={6}
                name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
              onChangeValidate={handleChangeValidate}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Text = Template.bind({});
