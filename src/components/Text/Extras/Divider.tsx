import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Space from "../../Space";
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

function TextDivider({ children, position = "center", text, hasMarginTop }: ITextDivider) {
  const { t } = useTranslation();

  const width = useMemo(() => {
    return widths[position];
  }, [position]);

  const marginTop = useMemo(() => {
    if (hasMarginTop ?? true) {
      return "2rem";
    }

    return "auto";
  }, [hasMarginTop]);

  return (
    <Space.Modifiers addOns={["full-space"]} mt={marginTop}>
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
