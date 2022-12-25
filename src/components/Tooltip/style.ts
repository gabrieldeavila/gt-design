import styled, { css } from "styled-components";
import { animations, flex, shadows } from "../../utils";
import { ITooltipContainer, ITooltipWrapper } from "./interface";

const getSize = (top: number, isAboveParent: boolean) => {
  top += 10;

  if (isAboveParent) {
    return -top;
  }

  return top;
};

const TooltipWrapper = styled.div<ITooltipWrapper>`
  position: absolute;
  top: ${({ top, isAboveParent }) => getSize(top, isAboveParent)}px;
  left: ${({ left }) => left}px;
  min-width: 1rem;
  max-width: 7rem;
  height: fit-content;
  background: ${({ theme }) => theme.primary};
  padding: 0.5rem;
  ${shadows.simple}
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: ${({ zIndex }) => zIndex};

  ${({ show, isFirstRender }) =>
    !isFirstRender &&
    (show
      ? css`
          animation: simpleShow 0.2s ease-in-out forwards;
        `
      : css`
          animation: simpleShowReverse 0.2s ease-in-out forwards;
        `)}

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
    background: ${({ theme }) => theme.primary};
    border: 5px solid ${({ theme }) => theme.primary};
    ${shadows.simple}
  }

  &:after {
    content: "";
    position: absolute;
    left: 45%;
    right: 0;
    top: ${({ isAboveParent }) => (isAboveParent ? "100%" : "10px")};
    transform: translateX(-40%) translatey(-100%);
    background: ${({ theme }) => theme.primary};
    border: 5px solid ${({ theme }) => theme.primary};
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

const Tooltip = {
  Wrapper: TooltipWrapper,
  Container: TooltipContainer,
  Title: TooltipTitle,
  Text: TooltipText,
};

export default Tooltip;
