import React, { forwardRef } from "react";
import { ExtraContrast } from "../Button";
import { IGTButton, IGTButtonStyle } from "../interface";
import DefaultBtn from "./default";

const ButtonContrast = forwardRef<IGTButtonStyle["Contrast"]>((props: IGTButton, ref) => {
  return <DefaultBtn component={<ExtraContrast />} {...props} />;
});

ButtonContrast.displayName = "Button.Contrast";

export default ButtonContrast;
