/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled, { css } from "styled-components";
import { animations, flex, hovers, scrolls, transforms } from "../../utils";
import { gtTransparentize } from "../../utils/colors";
import { IModal } from "./interface";

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
  background: ${gtTransparentize({ amount: 0.7, varName: "contrast" })};
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


  /* when is mobile, it removes the padding */
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ModalWrapper = styled.div<IModal>`
  min-width: 35vw;
  ${animations.easeOpenClose}
  animation: ${({ isOpen }) =>
    isOpen ?? false
      ? "popup 0.2s ease-in-out forwards"
      : "popupReverse 0.2s ease-in-out forwards"};
  background: var(--primary);
  border-radius: 0.25rem;
  overflow: hidden;

  /* when is mobile, it fits all the available space */
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  padding-bottom: 0;

  ${flex.justifyBetween}

  /* when it's mobile, it height is 20% */
  @media (max-width: 768px) {
    height: fit-content;
  }
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    ${transforms.XLpress};
  }

  ${hovers.scaleTransYOpacity}
`;

const ModalMain = styled.main`
  padding: 0 1.5rem;
  padding-right: 0.75rem;
  padding-top: 1.5rem;
  margin: 1.5rem 0;
  border-top: 1px solid
    ${gtTransparentize({ amount: 0.8, varName: "contrast" })};
  /* when it's mobile, it height is 60% less the 4.5rem */
  @media (max-width: 768px) {
    height: calc(70% - 5rem);
  }
`;

const ModalFooter = styled.footer`
  border-top: 1px solid
    ${gtTransparentize({ amount: 0.8, varName: "contrast" })};
  padding: 1.5rem;
`;

const ModalMainWrapper = styled.div`
  max-height: calc(100vh - 22rem);
  overflow: auto;
  padding-right: 0.75rem;

  ${scrolls.default}

  @media (max-width: 768px) {
    max-height: 100%;
  }
`;

export default {
  Content: ModalContent,
  Wrapper: ModalWrapper,
  Header: ModalHeader,
  Close: ModalClose,
  Main: ModalMain,
  Footer: ModalFooter,
  MainWrapper: ModalMainWrapper,
};
