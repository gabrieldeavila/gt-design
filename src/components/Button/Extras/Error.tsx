import React from "react";
import { ExtraError } from "../Button";
import { IGTButton } from "../interface";
import DefaultBtn from "./default";

function ButtonError(props: IGTButton) {
  return <DefaultBtn component={<ExtraError />} {...props} />;
}

export default ButtonError;
