import { transparentize } from "polished";
import { css } from "styled-components";
import { IGLobalStyle } from "../gt/Global/interface";

const scrollDefault = css`
  /* width */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${({ theme }: IGLobalStyle) => theme.secondary};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: IGLobalStyle) => theme.contrast};
    border-radius: 0.25rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }: IGLobalStyle) =>
      transparentize(0.5, theme.contrast)};
  }
`;

const scrolls = {
  default: scrollDefault,
};

export default scrolls;
