import React, { useMemo } from "react";
import Loader from "../../Loader";
import { ExtraSuccess } from "../Button";
import { IGTButton } from "../interface";

function ButtonSuccess({ children, isLoading, disabled, ...props }: IGTButton) {
  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return (
    // @ts-expect-error
    <ExtraSuccess disabled={verifyDisabled} isLoading={isLoading} {...props}>
      <div className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}

        <span className="extra-title-children">{children}</span>
      </div>
    </ExtraSuccess>
  );
}

export default ButtonSuccess;
