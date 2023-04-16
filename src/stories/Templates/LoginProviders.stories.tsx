import React from "react";
import { GTBasic } from "../../gt";
import { GTLoginProviders } from "../../gt/Template";

export default {
  title: "Templates/Login Providers",
};

const Template = () => {
  return (
    <GTBasic>
      <GTLoginProviders />
    </GTBasic>
  );
};

export const LoginProviders = Template.bind({});
