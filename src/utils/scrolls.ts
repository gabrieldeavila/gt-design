import { transparentize } from "polished";
import { css } from "styled-components";

const scrollDefault = css`
  /* width */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: var(--secondary)
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--contrast)
    border-radius: 0.25rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${transparentize(0.5, "var(--contrast)")};
  }
`;

const scrolls = {
  default: scrollDefault,
};

export default scrolls;
