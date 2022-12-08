import { transparentize } from "polished";
import styled from "styled-components";
import { shadows } from "../../utils";

const TooltipWrapper = styled.div`
  position: absolute;
  top: -100%;
  width: 10rem;
  height: 10rem;
  background: ${({ theme }) => theme.primary};
  padding: 0.5rem;
  ${shadows.simple}
  z-index: 1;
  border-radius: 0.25rem;

  .svg-polygon {
    position: absolute;
    stroke: ${({ theme }) => transparentize(0.5, theme.btnShadow)};
    transform: rotate(180deg) scale(0.2);
    top: 67%;
  }

  .svg-polygon-container {
    &:before {
      content: "";
      position: absolute;
      width: 14.5%;
      left: 51.2%;
      top: 91%;
      z-index: 1;
      height: 1rem;
      background: ${({ theme }) => theme.primary};
    }
  }

  .polygon-path {
    fill: ${({ theme }) => theme.primary};
  }
`;

const TooltipContainer = styled.div``;

const TooltipTitle = styled.h2``;

const TooltipText = styled.p``;

const Tooltip = {
  Wrapper: TooltipWrapper,
  Container: TooltipContainer,
  Title: TooltipTitle,
  Text: TooltipText,
};

export default Tooltip;
