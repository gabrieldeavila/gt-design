import { transparentize } from "polished";
import { css } from "styled-components";
import animations from "./animations";

const after = css`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-80%);
    background-image: linear-gradient(
      90deg,
      ${transparentize(1, "var(--secondary)")} 0,
      ${transparentize(0.2, "var(--secondary)")} 20%,
      ${transparentize(0.8, "var(--secondary)")} 60%,
      ${transparentize(1, "var(--secondary)")}
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const skeletons = {
  after,
};

export default skeletons;
