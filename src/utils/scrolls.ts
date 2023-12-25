import { css } from "styled-components";

const scrollDefault = css`
  /* width */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--contrast);
    border-radius: 5px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--contrast-0_5);
  }
`;

const scrolls = {
  default: scrollDefault,
};

export default scrolls;
