/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";
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

function testCNPJ(value: string) {
  if (value.length === 0) return false;

  const isString = typeof value === "string";
  const validTypes =
    isString || Number.isInteger(value) || Array.isArray(value);

  if (!validTypes) return false;

  if (isString) {
    if (value.length > 18) return false;

    const digitsOnly = /^\d{14}$/.test(value);
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

    if (digitsOnly || validFormat) true;
    else return false;
  }

  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;
  // @ts-expect-error
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const calc = (x: any) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  const digits = numbers.slice(12);

  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  const digit1 = calc(13);
  return digit1 === digits[1];
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
      invalidMessageMask = !isValidMask ? "INVALID_CPF" : "";
    } else {
      // checks if it is a valid cnpj
      isValidMask = testCNPJ(value);
      invalidMessageMask = !isValidMask ? "INVALID_CNPJ" : "";
    }

    return { isValidMask, invalidMessageMask };
  }, []);

  const docMask: INonNumericMask = {
    options: ["999.999.999-99", "99.999.999/9999-99"],
    type: "non_numeric_mask",
    onMaskChange: handleDocChange,
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleBlurValidate = useCallback(
    async (value: string | number): Promise<[boolean, string]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const hasError = Math.random() >= 0.5;

          resolve([hasError, "DOC_ALREADY_EXISTS"]);
        }, 2000);
      });
    },
    []
  );

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
              onBlurValidate={handleBlurValidate}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const NonNumericMask = Template.bind({});
