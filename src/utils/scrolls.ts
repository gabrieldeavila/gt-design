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

  overflow-y: scroll;
  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;

  &:hover {
    -webkit-mask-position: left top;
    mask-position: left top;
  }
`;

const scrolls = {
  default: scrollDefault,
};

export default scrolls;
