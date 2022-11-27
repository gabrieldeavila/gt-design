import React, { useCallback } from "react";
import { GTBasic } from "../gt";
import { GTLogin } from "../gt/Template";

export default {
  title: "GTDesign/Login",
};

const Template = function LoginStory() {
  const onPasswordForgot = useCallback(() => {
    console.log("onPasswordForgot");
  }, []);

  return (
    <GTBasic>
      <GTLogin onPasswordForgot={onPasswordForgot} />
    </GTBasic>
  );
};

export const GTBox = Template.bind({});
