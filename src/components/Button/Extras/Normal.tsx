import React from "react";
import { ExtraNormal } from "../Button";
import { IGTButton } from "../interface";
import DefaultBtn from "./default";

function ButtonNormal(props: IGTButton) {
  return <DefaultBtn component={<ExtraNormal />} {...props} />;
}

export default ButtonNormal;
