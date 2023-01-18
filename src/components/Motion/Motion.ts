import { motion } from "framer-motion";
import styled from "styled-components";
import { IMotionWrapper } from "./interface";

const MotionWrapper = styled.div<IMotionWrapper>`
  position: relative;
  grid-row-end: span ${({ span }) => (span != null ? span : 1)};
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

const Motion = {
  Wrapper: MotionWrapper,
  Container: MotionContainer,
};

export default Motion;
