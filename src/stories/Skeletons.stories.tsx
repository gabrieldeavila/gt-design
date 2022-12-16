import React, { useEffect, useState } from "react";
import { GTInput, Input, Space } from "../components";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Skeletons",
  args: {
    isLoading: true,
  },
  argTypes: {
    isLoading: {
      control: "boolean",
      default: false
    },
  },

  // add description to the isloading arg
  parameters: {
    docs: {
      description: {
        component: "Skeleton components that show when the page is loading. You only need to pass if it is loading or not. The rest is handled by the context.",
      },
    },
  },
};

const Template = function Skeleton({ isLoading }: { isLoading: boolean; }) {
  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <GTBasic>
      <GTPageStateProvider
        pageState={pageState}
        setPageState={setPageState}
        errors={errors}
        setErrors={setErrors}
        isLoading={isLoading}
      >
        <Space.Horizontal>
          <Input.Group>
            <GTInput.Select row={4} title="wow such charm 🐲" text="what" label="Select" name="select" options={options} />
            <GTInput.Text
              row={4}
              text="change"
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Email row={8} text="Email" name="email" label="TEMPLATE.LOGIN.EMAIL_LABEL" />

            <GTInput.Password row={8} text="EXAMPLE.TEXT" title="EXAMPLE.TITLE" name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const Skeleton = Template.bind({});
