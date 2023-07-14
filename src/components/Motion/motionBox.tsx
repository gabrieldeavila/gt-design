/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useMemo } from "react";
import randomNumber from "../../utils/randomNumber";
import Box from "../Box/Box";
import { Zinc } from "../Zinc";
import Motion from "./Motion";
import { IMotionBox } from "./interface";

function MotionBox({
  bg,
  children,
  isLoading,
  title,
  text,
  onClick,
}: IMotionBox) {
  const spanHeight = useMemo(() => randomNumber(10, 20), []);

  return (
    <Motion.Wrapper span={spanHeight}>
      <Zinc {...{ title, text, onClick }}>
        <Box.Container bg={bg} isLoading={isLoading}>
          {children}
        </Box.Container>
      </Zinc>
    </Motion.Wrapper>
  );
}

export default MotionBox;
