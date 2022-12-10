import styled, { css } from "styled-components";
import { flex, shadows } from "../../utils";

const TooltipWrapper = styled.div`
  position: absolute;
  top: -${({ top }: { top: number }) => top + 6.9}px;
  left: 25%;
  min-width: 1rem;
  max-width: 10rem;
  height: fit-content;
  background: ${({ theme }) => theme.primary};
  padding: 0.5rem;
  ${shadows.simple}
  z-index: 1;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TooltipContainer = styled.div`
  ${flex.wrapGap}
  gap: 0.5rem;
  flex-direction: column;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
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
    top: 100%;
    transform: translateX(-40%) translatey(-100%);
    background: ${({ theme }) => theme.primary};
    border: 5px solid ${({ theme }) => theme.primary}};
  }
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
