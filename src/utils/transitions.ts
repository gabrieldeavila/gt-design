import { css } from "styled-components";

const basic = css`
  transition: all 0.2s ease-in-out;
`;

const linear = css`
  transition: all 0.2s linear;
`;

const smooth = css`
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const transitions = {
  basic,
  linear,
  smooth,
};

export default transitions;
