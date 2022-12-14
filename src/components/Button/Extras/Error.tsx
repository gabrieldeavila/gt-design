import React, { useMemo } from "react";
import Loader from "../../Loader";
import { ExtraError } from "../Button";
import { IGTButton } from "../interface";

function ButtonError({ children, isLoading, disabled, ...props }: IGTButton) {
  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return (
    // @ts-expect-error
    <ExtraError disabled={verifyDisabled} isLoading={isLoading} {...props}>
      <span className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}
        <span className="extra-title-children">{children}</span>
      </span>
    </ExtraError>
  );
}

export default ButtonError;
