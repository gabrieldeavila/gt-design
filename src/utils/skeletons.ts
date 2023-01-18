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
      ${({ theme }) => transparentize(1, theme.secondary)} 0,
      ${({ theme }) => transparentize(0.2, theme.secondary)} 20%,
      ${({ theme }) => transparentize(0.8, theme.secondary)} 60%,
      ${({ theme }) => transparentize(1, theme.secondary)}
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const skeletons = {
  after,
};

export default skeletons;
