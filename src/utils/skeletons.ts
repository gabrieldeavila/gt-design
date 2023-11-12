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
      var(--secondary-0_99) 0,
      var(--secondary-0_2) 20%,
      var(--secondary-0_8) 60%,
      var(--secondary-0_99)
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const highContrast = css`
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
      var(--secondary-0_99) 0,
      var(--secondary-0_2) 20%,
      var(--contrast-0_9) 60%,
      var(--secondary-0_99)
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const skeletons = {
  after,
  highContrast
};

export default skeletons;
