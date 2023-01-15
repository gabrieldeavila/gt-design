/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { animations, flex, hovers, transitions } from "../../utils";
import { IModal } from "./interface";

// Y

const top = css`
  align-items: start;
`;

const bottom = css`
  align-items: end;
`;

const centerY = css`
  align-items: center;
`;

type y = {
  [key in "top" | "bottom" | "center"]: any;
};

const orientationYOpts: y = {
  top,
  bottom,
  center: centerY,
};

// X

const left = css`
  justify-content: start;
`;

const right = css`
  justify-content: end;
`;

const centerX = css`
  justify-content: center;
`;

type x = {
  [key in "left" | "right" | "center"]: any;
};

const orientationXOpts: x = {
  left,
  right,
  center: centerX,
};

const ModalContent = styled.div<IModal>`
  position: fixed;
  z-index: 1101;
  background: ${(props) => transparentize(0.7, props.theme.contrast)};
  padding: 3rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  animation: ${({ isOpen }) =>
    isOpen ?? false
      ? "opacity 0.2s ease-in-out forwards"
      : "opacityReverse 0.2s ease-in-out forwards"};

  ${animations.easeOpacity}
  ${flex.alignCenter}

  ${({ currOrientationY }) => {
    const pos = currOrientationY ?? "center";

    return orientationYOpts[pos];
  }}

  ${({ currOrientationX }) => {
    const pos = currOrientationX ?? "center";

    return orientationXOpts[pos];
  }}
`;

const ModalContainer = styled.div`
  margin: 2rem;
`;

const ModalWrapper = styled.div<IModal>`
  min-width: 35vw;
  ${animations.easeOpenClose}
  animation: ${({ isOpen }) =>
    isOpen ?? false
      ? "popup 0.2s ease-in-out forwards"
      : "popupReverse 0.2s ease-in-out forwards"};
  background: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  ${flex.justifyBetween}
`;

const ModalClose = styled.div`
  cursor: pointer;

  ${transitions.linear}
  ${hovers.scaleTransYOpacity}
`;

const ModalMain = styled.main`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => transparentize(0.8, props.theme.contrast)};
`;

const ModalFooter = styled.footer`
  padding-top: 1.5rem;
`;

export default {
  Content: ModalContent,
  Wrapper: ModalWrapper,
  Container: ModalContainer,
  Header: ModalHeader,
  Close: ModalClose,
  Main: ModalMain,
  Footer: ModalFooter,
};
