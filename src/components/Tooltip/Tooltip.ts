import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { flex, shadows } from "../../utils";

const TooltipWrapper = styled.div`
  position: absolute;
  top: -${({ top }: { top: number }) => top + 6.9}px;
  left: 25%;
  width: 10rem;
  height: fit-content;
  background: ${({ theme }) => theme.primary};
  padding: 0.5rem;
  ${shadows.simple}
  z-index: 1;
  border-radius: 0.25rem;

  .svg-polygon-container {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      top: 91%;
      z-index: 1;
      height: 1rem;
      /* background: ${({ theme }) => theme.primary}; */
    }
  }

  .svg-polygon {
    position: absolute;
    stroke: ${({ theme }) => transparentize(0.5, theme.btnShadow)};
    transform: rotate(180deg);
    bottom: -10%;
  }

  .polygon-path {
    fill: ${({ theme }) => theme.primary};
  }
`;

const TooltipContainer = styled.div`
  ${flex.wrapGap}
  gap: 0.5rem;
`;

const position = css`
  z-index: 1;
  position: relative;
`;

const TooltipTitle = styled.h2`
  ${position}
  font-size: 14px;
`;

const TooltipText = styled.p`
  ${position}
  font-size: 12px;
  font-weight: 100;
`;

const Tooltip = {
  Wrapper: TooltipWrapper,
  Container: TooltipContainer,
  Title: TooltipTitle,
  Text: TooltipText,
};

export default Tooltip;
