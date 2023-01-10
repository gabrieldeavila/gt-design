import React, { useMemo } from "react";
import Loader from "../../Loader";
import { ExtraNormal } from "../Button";
import { IGTButton } from "../interface";

function ButtonNormal({ children, isLoading, disabled, ...props }: IGTButton) {
  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return (
    // @ts-expect-error
    <ExtraNormal disabled={verifyDisabled} isLoading={isLoading} {...props}>
      <span className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}
        <span className="extra-title-children">{children}</span>
      </span>
    </ExtraNormal>
  );
}

export default ButtonNormal;
