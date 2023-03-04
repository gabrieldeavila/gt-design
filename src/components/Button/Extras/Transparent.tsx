import React from "react";
import { ResetBtn } from "../Button";
import { IGTButton } from "../interface";
import DefaultBtn from "./default";

function ButtonTransparent(props: IGTButton) {
  return <DefaultBtn component={<ResetBtn />} {...props} />;
}

export default ButtonTransparent;
