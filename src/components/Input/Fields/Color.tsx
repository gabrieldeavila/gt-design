import React from "react";
import GTInputText from "./Text";
import { IGTInputText } from "./interface";
import Input from "../Input";

function GTInputColor(props: IGTInputText) {
  return (
    <GTInputText
      {...props}
      customType="color"
      customField={<ColorComponent />}
    />
  );
}

export default GTInputColor;

function ColorComponent(props: any) {
  return <Input.Color type="color" {...props} />;
}
