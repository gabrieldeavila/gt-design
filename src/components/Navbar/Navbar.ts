/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { color, flexbox, space } from "styled-system";
import animations from "../../utils/animations";
import flex from "../../utils/flex";
import shadows from "../../utils/shadows";
import transitions from "../../utils/transitions";
import { INavbarOptions, INavbarWrapper } from "./interface";

const NavbarWrapper = styled.nav<INavbarWrapper>`
  min-height: 3rem;
  position: fixed;
  width: -webkit-fill-available;
  z-index: 1100;
  background: ${(props) => transparentize(0.5, props.theme.primary)};
  padding: 0.5rem 1.5rem;
  ${shadows.simple}
  ${color}
  ${space}
  ${flexbox}
  backdrop-filter: blur(10px);
  animation: ${(props: { show: boolean }) =>
    props.show
      ? "show 0.2s ease-in-out forwards"
      : "showReverse 0.2s ease-in-out forwards"};
  ${animations.easeShow}

  p {
    margin: 0;
  }
`;

const NavbarContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  ${color}
  ${space}
  ${flexbox}
`;

const NavbarOptions = styled.div<INavbarOptions>`
  display: flex;
  gap: 1rem;
  height: fit-content;
  top: ${(props) => props.top ?? 0}px;
  ${space}
`;

const NavbarOption = styled.div`
  cursor: pointer;
  border-radius: 0.25rem;
  padding: 0.15rem;
  ${transitions.basic}
  ${flex.alignCenterCol}

  &:hover {
    background: ${(props) => props.theme.backgroundHover};
  }

  /* when mobile, scale down */
  @media (max-width: 768px) {
    transform: scale(0.7);
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  ${NavbarOptions} {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const NavbarTitle = styled.h1`
  user-select: none;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${(props) => props.theme.contrast};
`;

const textCss = css`
  user-select: none;
  cursor: pointer;
  height: fit-content;
  padding: 0.75rem 0.5rem;
  ${transitions.basic}

  /* when mobile, removes padding */
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const NavbarText = styled.p`
  ${textCss}
`;

const NavbarSubText = styled.h2`
  ${textCss}
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.contrast};
`;

const NavbarPopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 4.5rem;

  @media (max-width: 768px) {
    top: -250%;
  }
`;

const NavbarPopup = styled.div`
  border-radius: 0.25rem;
  margin-top: 4.5rem;
  min-width: 15rem;
  background-color: ${(props) => props.theme.primary};
  gap: 0.5rem;
  flex-direction: column;
  z-index: 10;
  ${transitions.basic};
  ${shadows.simple};

  animation: ${(props: { isOpen: boolean }) =>
    props.isOpen
      ? "popup 0.2s ease-in-out forlwards"
      : "popupReverse 0.2s ease-in-out forwards"};
  ${animations.easeOpenClose}

  ${NavbarText}:hover, ${NavbarSubText}:hover {
    background: ${(props) => props.theme.backgroundHover};
  }

  ${NavbarText}, ${NavbarSubText} {
    border-bottom: 1px solid
      ${(props) => transparentize(0.5, props.theme.contrast)};
  }

  ${NavbarText}:last-child, ${NavbarSubText}:last-child {
    border-bottom: none;
  }
`;

const NavbarOptionWrapper = styled.div`
  position: relative;
`;

const NavbarRight = styled.div``;

const NavbarLogo = styled.div`
  & > * {
    ${flex.alignCenterCol};
    height: 3rem;
    width: 3rem;
  }
`;

export default {
  Wrapper: NavbarWrapper,
  Container: NavbarContainer,
  Left: NavbarLeft,
  Title: NavbarTitle,
  Options: NavbarOptions,
  Option: NavbarOption,
  OptionWrapper: NavbarOptionWrapper,
  Text: NavbarText,
  SubText: NavbarSubText,
  PopupWrapper: NavbarPopupWrapper,
  Popup: NavbarPopup,
  Right: NavbarRight,
  Logo: NavbarLogo,
};
