/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Input from "../Input";
import GTInputText from "./Text";
import { IGTInputText } from "./interface";

function GTInputColor(props: IGTInputText) {
  return (
    <GTInputText
      {...props}
      customType="color"
      customField={<ColorComponent />}
    />
  );
}

export default GTInputColor;

function ColorComponent(props: any) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref?.current == null) return;

    const parentRef = ref.current.parentElement;
    const label = parentRef?.querySelector("label");
    console.log(label);

    const handleClick = (e: MouseEvent) => {
      // is clicking on the input?
      const isClickingOnInput = e.target === ref.current;

      if (isClickingOnInput) return;
      ref.current?.click();
    };

    parentRef?.addEventListener("click", handleClick);

    return () => {
      parentRef?.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (props.isLabel) {
      setTimeout(() => {
        ref.current?.click();
      });
    }
  }, [props.isLabel]);

  return <Input.Color ref={ref} type="color" {...props} />;
}
