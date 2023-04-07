import { css } from "styled-components";
import { gtTransparentize } from "./colors";

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
    background: var(--contrast);
    border-radius: 0.25rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${gtTransparentize({ amount: 0.5, varName: "contrast" })};
  }
`;

const scrolls = {
  default: scrollDefault,
};

export default scrolls;
