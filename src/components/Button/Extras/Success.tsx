import React from "react";
import { IGTHandlers } from "../../../gt/Global/interface";
import { ExtraSuccess } from "../Button";

function ButtonSuccess({ children, ...props }: IGTHandlers) {
  return (
    // @ts-expect-error
    <ExtraSuccess {...props}>
      <span className="extra-title">{children}</span>
    </ExtraSuccess>
  );
}

export default ButtonSuccess;
