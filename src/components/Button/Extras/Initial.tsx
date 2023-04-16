import React from "react";
import { ExtraInitial } from "../Button";
import { IGTButtonInitial } from "../interface";
import DefaultBtn from "./default";

function ButtonInitial(props: IGTButtonInitial) {
  return <DefaultBtn component={<ExtraInitial />} {...props} />;
}

export default ButtonInitial;
