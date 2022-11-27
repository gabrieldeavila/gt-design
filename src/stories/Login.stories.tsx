import { ComponentStory } from "@storybook/react";
import React, { useCallback } from "react";
import { GTBasic } from "../gt";
import { GTLogin } from "../gt/Template";

function LoginStory() {
  const onPasswordForgot = useCallback(() => {
    console.log("onPasswordForgot");
  }, []);

  return (
    <GTBasic>
      <GTLogin onPasswordForgot={onPasswordForgot} />
    </GTBasic>
  );
}

export default {
  title: "GTDesign/Login",
  component: LoginStory,
};

const Template: ComponentStory<typeof LoginStory> = (args) => <LoginStory />;

export const GTBox = Template.bind({});
