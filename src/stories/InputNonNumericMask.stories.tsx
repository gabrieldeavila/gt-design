import React, { useCallback, useState } from "react";
import { GTInput, Input, Space } from "../components";
import { INonNumericMask } from "../components/Input/Fields/interface";
import SectionContainer from "../components/Text/Template/SectionContainer";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "Data Entry/Inputs/NonNumericMask",
};

function testCPF(strCPF: string) {
  let sum = 0;
  let rest;

  if (strCPF === "00000000000") return false;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

const Template = () => {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleDocChange = useCallback((value: string) => {
    let isValidMask = true;
    let invalidMessageMask = "";

    // if the values is bigger than 11 it's a CNPJ, otherwise it's a CPF (brazilian docs)
    if (value.length <= 11) {
      // checks if it is a valid cpf
      isValidMask = testCPF(value);
      invalidMessageMask = !isValidMask ? "CPF ERRADO!!" : "";
    }

    return { isValidMask, invalidMessageMask };
  }, []);

  const docMask: INonNumericMask = {
    options: ["999.999.999-99", "99.999.999/9999-99"],
    type: "non_numeric_mask",
    onMaskChange: handleDocChange,
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
              name="doc"
              label="Doc"
              mask={docMask}
              min={10}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const NonNumericMask = Template.bind({});
