import React from "react";
import { IGTHandlers } from "../../../gt/Global/interface";
import { ExtraError } from "../Button";

function ButtonError({ children, ...props }: IGTHandlers) {
  return (
    // @ts-expect-error
    <ExtraError {...props}>
      <span className="extra-title">{children}</span>
    </ExtraError>
  );
}

export default ButtonError;
