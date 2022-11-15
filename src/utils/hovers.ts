import { css } from "styled-components";

const scaleTransYOpacity = css`
  &:hover {
    transform: scale(1.05) translateY(-0.25rem);
    opacity: 0.8;
  }
`;

const hovers = {
  scaleTransYOpacity,
};

export default hovers;
