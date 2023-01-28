import React, { useState } from "react";
import { GTInput, Input, Space } from "../components";
import { INumericMask } from "../components/Input/Fields/interface";
import SectionContainer from "../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "Data Entry/Inputs/NumericMask",
};

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const moneyMask: INumericMask = {
    suffix: "",
    prefix: "US$  ",
    thousandsSeparatorSymbol: ",",
    decimalSymbol: ".",
    decimalLimit: 2,
    integerLimit: 7,
    allowNegative: true,
    type: "numeric_mask",
    min: 57,
    max: 522,
  };

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
            subtitle="STORIES.INPUTS.NUMERIC_MASK.SUBTITLE"
          />
          <Input.Group>
            <GTInput.Mask
              title="（⊙ｏ⊙）"
              row={5}
              name="price"
              label="EXAMPLE.MONEY"
              mask={moneyMask}
              min={10}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const NumericMask = Template.bind({});
