/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useMemo, useRef } from "react";
import randomNumber from "../../utils/randomNumber";
import Box from "../Box/Box";
import Motion from "./Motion";
import { IMotionBox } from "./interface";

function MotionBox({ bg, children, isLoading }: IMotionBox) {
  // const control = useAnimation();
  const ref = useRef(null);
  // const isInView = useInView(ref);
  const spanHeight = useMemo(() => randomNumber(10, 20), []);

  // const boxVariant = useMemo(
  //   () => ({
  //     visible: {
  //       opacity: 1,
  //       scale: 1,
  //       rotate: 0,
  //       transition: { duration: 0.2 },
  //     },
  //     hidden: { opacity: 0, scale: 0 },
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   if (isInView) {
  //     control.start("visible");
  //   } else {
  //     control.start("hidden");
  //   }
  // }, [control, isInView]);

  return (
    <Motion.Wrapper span={spanHeight}>
      <Motion.Container
        ref={ref}
        // variants={boxVariant}
        // initial="hidden"
        // animate={control}
      >
        <Box.Container bg={bg} isLoading={isLoading}>
          {children}
        </Box.Container>
      </Motion.Container>
    </Motion.Wrapper>
  );
}

export default MotionBox;
