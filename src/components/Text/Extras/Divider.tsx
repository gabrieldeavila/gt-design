import PropTypes from "prop-types";
import React, { useMemo } from "react";
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

function TextDivider({ children, position }: ITextDivider) {
  const width = useMemo(() => {
    // @ts-expect-error
    return widths[position];
  }, [position]);

  return (
    <DividerWrapper width={width}>
      <DividerText>{children}</DividerText>
    </DividerWrapper>
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
