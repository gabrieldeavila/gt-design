import styled from "styled-components";
import { motion } from "framer-motion";

const MotionWrapper = styled.div`
  position: relative;
  grid-row-end: span ${({ span }: { span: string | number }) => span || 1};
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Motion = {
  Wrapper: MotionWrapper,
  Container: MotionContainer,
};

export default Motion;
