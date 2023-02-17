/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";
import { GTInput, Input, Space } from "../../../components";
import {
  TBlurValidate,
  TChangeValidate,
} from "../../../components/Input/Fields/interface";
import SectionContainer from "../../../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../../../context/pageState";
import { GTBasic } from "../../../gt";

export default {
  title: "Data Entry/Inputs/Number",
};

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleChangeValidate: TChangeValidate = useCallback((value) => {
    const number = parseFloat(value.toString());

    let isValid = true;
    let errorMsg = "";
    let errorParams = {};

    if (number !== 8) {
      isValid = false;
      errorMsg = "INVALID_NUMBER";
      errorParams = { NUMBER: "8" };
    }

    return [isValid, errorMsg, errorParams];
  }, []);

  const handleBlurValidate: TBlurValidate = useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const rand = Math.random() * 10;
        const isValid = rand > 5;

        resolve([isValid, "OPS"]);
      }, 200);
    });
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
            <GTInput.Number
              row={6}
              text="щ(ʘ╻ʘ)щ"
              name="nickname"
              label="EXAMPLE.NUMBER"
              onBlurValidate={handleBlurValidate}
              onChangeValidate={handleChangeValidate}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Number = Template.bind({});
