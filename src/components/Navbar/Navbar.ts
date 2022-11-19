/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { transparentize } from "polished";
import styled from "styled-components";
import { color, flexbox, space } from "styled-system";
import animations from "../../utils/animations";
import flex from "../../utils/flex";
import shadows from "../../utils/shadows";
import transitions from "../../utils/transitions";

const NavbarWrapper = styled.nav`
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
  animation: ${(props: { show: true }) =>
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
const NavbarOptions = styled.div`
  display: flex;
  gap: 1rem;
  height: fit-content;
  top: ${(props: { top: number }) => props.top || 0}px;
  ${space}
`;

const NavbarOption = styled.div`
  cursor: pointer;
  border-radius: 0.5rem;
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
  font-weight: 800;
  font-size: 1.5rem;
  color: ${(props) => props.theme.contrast};
`;

const NavbarText = styled.p`
  user-select: none;
  cursor: pointer;
  height: fit-content;
  padding: 1rem;
  ${transitions.basic}

  /* when mobile, removes padding */
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const NavbarPopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 4rem;

  @media (max-width: 768px) {
    top: -250%;
  }
`;

const NavbarPopup = styled.div`
  margin-top: 4rem;
  padding: 0.35rem 0;
  min-width: 15rem;
  background: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  gap: 0.5rem;
  flex-direction: column;
  z-index: 10;
  ${shadows.basic}
  ${transitions.basic}

  animation: ${(props: { open: boolean }) =>
    props.open
      ? "popup 0.2s ease-in-out forwards"
      : "popupReverse 0.2s ease-in-out forwards"};
  ${animations.easeOpenClose}

  ${NavbarText}:hover {
    background: ${(props) => props.theme.backgroundHover};
  }
`;

const NavbarOptionWrapper = styled.div`
  position: relative;
`;

const NavbarRight = styled.div``;

export default {
  Wrapper: NavbarWrapper,
  Container: NavbarContainer,
  Left: NavbarLeft,
  Title: NavbarTitle,
  Options: NavbarOptions,
  Option: NavbarOption,
  OptionWrapper: NavbarOptionWrapper,
  Text: NavbarText,
  PopupWrapper: NavbarPopupWrapper,
  Popup: NavbarPopup,
  Right: NavbarRight,
};
