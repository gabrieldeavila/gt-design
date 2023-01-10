import React, { useMemo } from "react";
import Loader from "../../Loader";
import { ExtraContrast } from "../Button";
import { IGTButton } from "../interface";

function ButtonContrast({
  children,
  isLoading,
  disabled,
  ...props
}: IGTButton) {
  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return (
    // @ts-expect-error
    <ExtraContrast disabled={verifyDisabled} isLoading={isLoading} {...props}>
      <span className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}
        <span className="extra-title-children">{children}</span>
      </span>
    </ExtraContrast>
  );
}

export default ButtonContrast;
