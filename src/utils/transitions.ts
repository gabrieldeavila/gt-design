import { css } from "styled-components";

const basic = css`
  transition: all 0.2s ease-in-out;
`;

const linear = css`
  transition: all 0.2s linear;
`;

const transitions = {
  basic,
  linear,
};

export default transitions;
