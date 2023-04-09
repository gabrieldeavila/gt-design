import { getLuminance, transparentize } from "polished";
import styled, { css } from "styled-components";
import { color } from "styled-system";
import flex from "../../utils/flex";
import hovers from "../../utils/hovers";
import shadows from "../../utils/shadows";
import skeletons from "../../utils/skeletons";
import {
  IBoxContainer,
  IBoxWrapper,
  IHandleColorContrastReceive,
  IHandleColorContrastReturn,
} from "./interface";

const BoxGroup = styled.div`
  ${flex.alignCenter}
  flex-wrap: wrap;
`;

const BoxWrapper = styled.div<IBoxWrapper>`
  width: ${(props) => props.width ?? "100"}%;

  /* when it's mobile, width is 100% */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const handleColorContrast = ({
  bg,
}: IHandleColorContrastReceive): IHandleColorContrastReturn => {
  const luminance = bg != null ? getLuminance(bg) : 0;

  if (luminance > 0.5) {
    return "black !important";
  }

  return "white !important";
};

const BoxContainer = styled.div<IBoxContainer>`
  margin: 1rem;
  padding: 3rem;
  border-radius: 0.25rem;
  ${flex.wrapGap};
  ${flex.column};
  ${shadows.simple};
  ${color};
  background: ${({ bg }) =>
    bg != null ? transparentize(0.45, bg) : "var(--primary-0_5)"};
  backdrop-filter: blur(15px);
  cursor: pointer;
  height: -webkit-fill-available;
  ${hovers.scaleTransYOpacity}

  /* add contrast to children */
  & > * {
    color: ${handleColorContrast};
  }

  ${({ isLoading }) =>
    (isLoading ?? false) &&
    css`
      ${skeletons.after};
      cursor: wait;
    `}
`;

const BoxColumn = styled.div`
  /* a grid like pinterest, where it does not care about the biggest height */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 0.5rem;
  grid-gap: 0.5rem;

  ${BoxContainer} {
    margin: 0.25rem;
  }
`;

const Box = {
  Group: BoxGroup,
  Wrapper: BoxWrapper,
  Container: BoxContainer,
  Column: BoxColumn,
};

export default Box;
