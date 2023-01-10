import React, { useMemo } from "react";
import Loader from "../../Loader";
import { ResetBtn } from "../Button";
import { IGTButton } from "../interface";

function ButtonTransparent({
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
    <ResetBtn disabled={verifyDisabled} isLoading={isLoading} {...props}>
      <span className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}
        <span className="extra-title-children">{children}</span>
      </span>
    </ResetBtn>
  );
}

export default ButtonTransparent;
