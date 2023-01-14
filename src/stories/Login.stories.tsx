import React, { useCallback } from "react";
import { GTBasic } from "../gt";
import { GTLogin } from "../gt/Template";

export default {
  title: "Templates/Login",
};

const Template = () => {
  const onPasswordForgot = useCallback(() => {
    console.log("onPasswordForgot");
  }, []);

  return (
    <GTBasic>
      <GTLogin onPasswordForgot={onPasswordForgot} />
    </GTBasic>
  );
};

export const Login = Template.bind({});
