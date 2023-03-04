import React from "react";
import { ExtraSuccess } from "../Button";
import { IGTButton } from "../interface";
import DefaultBtn from "./default";

function ButtonSuccess(props: IGTButton) {
  return <DefaultBtn component={<ExtraSuccess />} {...props} />;
}

export default ButtonSuccess;
