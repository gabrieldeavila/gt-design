/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useMemo, useRef } from "react";
import useGTTranslate from "../../../gt/Global/translate";
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
  symbol,
  ...props
}: IResetButton) {
  const containerRef = useRef<HTMLButtonElement>(null);

  const verifyDisabled = useMemo(
    () => disabled ?? isLoading,
    [disabled, isLoading]
  );

  return (
    <>
      {React.createElement(
        component.type,
        {
          ...props,
          disabled: verifyDisabled,
          isLoading,
          ref: containerRef,
        },
        <span className="extra-title">
          {(isLoading ?? false) && <Loader.Simple />}
          {symbol ?? false ? (
            <BtnWithSymbol {...{ symbol, name: props.name }} />
          ) : (
            <BtnWithoutSymbol {...{ children, content }} />
          )}
        </span>
      )}

      <GTTooltip parentRef={containerRef} title={title} text={text} />
    </>
  );
}

export default DefaultBtn;

function BtnWithoutSymbol({
  children,
  content,
}: {
  children?: any;
  content?: any;
  name?: string;
}) {
  const { translateThis } = useGTTranslate();

  return (
    <span className="extra-title-children">
      {children}
      {content && translateThis(content)}
    </span>
  );
}

function BtnWithSymbol({ symbol, name }: { symbol: any; name?: string }) {
  return (
    <>
      {symbol} {name}
    </>
  );
}
