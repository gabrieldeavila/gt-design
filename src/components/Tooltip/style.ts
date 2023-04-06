import styled, { css } from "styled-components";
import { animations, flex, shadows } from "../../utils";
import {
  ITooltipContainer,
  ITooltipContent,
  ITooltipWrapper,
} from "./interface";

const TooltipWrapper = styled.div<ITooltipWrapper>`
  position: relative;
  min-width: 1rem;
  max-width: 7rem;
  height: fit-content;
  background: var(--primary);
  padding: 0.5rem;
  ${shadows.simple}
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  ${animations.simple}
`;

const TooltipContainer = styled.div<ITooltipContainer>`
  ${flex.wrapGap}
  gap: 0.5rem;
  flex-direction: column;
  user-select: none;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: ${({ isAboveParent }) => (isAboveParent ? "100%" : "0")};
    transform: translateX(-40%) translatey(-50%) rotate(45deg);
    background: var(--primary);
    border: 5px solid  var(--primary);
    ${shadows.simple}
  }

  &:after {
    content: "";
    position: absolute;
    left: 45%;
    right: 0;
    top: ${({ isAboveParent }) => (isAboveParent ? "100%" : "10px")};
    transform: translateX(-40%) translatey(-100%);
    background: var(--primary);
    border: 5px solid  var(--primary);
  }
`;

const position = css`
  z-index: 1;
  position: relative;

  text-align: center;
`;

const TooltipTitle = styled.h3`
  ${position}
  font-size: 0.75rem;
  font-weight: 400;
`;

const TooltipText = styled.p`
  ${position}
  font-size: 12px;
  font-weight: 200;
`;

const TooltipContent = styled.div<ITooltipContent>`
  position: absolute;
  transition: 0.25s ease;
  transform: ${({ show }) =>
    show ? "translateY(0px) scale(1)" : "translateY(-1.5rem) scale(0)"};
  z-index: 12;

  /* if is above parent do something diff */
  ${({ isAboveParent }) =>
    isAboveParent
      ? css`
          bottom: calc(100% + 9px);
        `
      : css`
          top: calc(100% + 9px);
        `}
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const Tooltip = {
  Content: TooltipContent,
  Wrapper: TooltipWrapper,
  Container: TooltipContainer,
  Title: TooltipTitle,
  Text: TooltipText,
};

export default Tooltip;
