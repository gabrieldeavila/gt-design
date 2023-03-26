import React, { useMemo, useRef } from "react";
import { Trans } from "react-i18next";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import { IResetButton } from "../interface";

function DefaultBtn({
  isLoading,
  disabled,
  children,
  content,
  title,
  text,
  component,
  ...props
}: IResetButton) {
  const containerRef = useRef<HTMLButtonElement>(null);

  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return React.createElement(
    component.type,
    {
      ...props,
      disabled: verifyDisabled,
      isLoading,
      ref: containerRef,
    },
    <>
      <span className="extra-title">
        {(isLoading ?? false) && <Loader.Simple />}
        <span className="extra-title-children">
          <Trans>{children ?? content ?? ""}</Trans>
        </span>
      </span>
      <GTTooltip parentRef={containerRef} title={title} text={text} />
    </>
  );
}

export default DefaultBtn;
