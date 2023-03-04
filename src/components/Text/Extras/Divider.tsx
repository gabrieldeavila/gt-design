import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Space from "../../Space";
import { TAddOns } from "../../Space/interface";
import { ITextDivider } from "../interface";
import { DividerText, DividerWrapper } from "../Text";

const widths = {
  left: {
    after: "95%",
    before: "5%",
  },

  center: {
    after: "50%",
    before: "50%",
  },

  right: {
    after: "5%",
    before: "95%",
  },
};

function TextDivider({ children, position, text, hasMarginTop }: ITextDivider) {
  const { t } = useTranslation();

  const width = useMemo(() => {
    // @ts-expect-error
    return widths[position];
  }, [position]);

  const addOns: TAddOns[] = useMemo(() => {
    if (hasMarginTop ?? true) {
      return ["full-space", "mt-2"];
    }

    return ["full-space"];
  }, [hasMarginTop]);

  return (
    <Space.Modifiers addOns={addOns}>
      <DividerWrapper currWidth={width}>
        <DividerText>{children ?? t(text ?? "")}</DividerText>
      </DividerWrapper>
    </Space.Modifiers>
  );
}

export default TextDivider;

TextDivider.prototype = {
  children: PropTypes.node,
  position: PropTypes.oneOf(["left", "center", "right"]),
};

TextDivider.defaultProps = {
  children: null,
  position: "center",
};
