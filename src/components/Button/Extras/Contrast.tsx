import React from "react";
import { ExtraContrast } from "../Button";
import { IGTButton } from "../interface";
import DefaultBtn from "./default";

function ButtonContrast(props: IGTButton) {
  return <DefaultBtn component={<ExtraContrast />} {...props} />;
}

export default ButtonContrast;
