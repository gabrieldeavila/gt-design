import { css } from "styled-components";

const basicTransitionSecs = 0.2;

const basic = css`
  transition: all ${basicTransitionSecs}s ease-in-out;
`;

const linear = css`
  transition: all ${basicTransitionSecs}s linear;
`;

const transitions = {
  basic,
  linear,
  basicTransitionSecs,
};

export default transitions;
