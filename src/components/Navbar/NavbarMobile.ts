import { transparentize } from "polished";
import styled from "styled-components";
import flex from "../../utils/flex";
import transitions from "../../utils/transitions";

const NavbarMobileWrapper = styled.div`
  background-color: ${transparentize(0.5, "var(--primary)")};
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const NavbarMobileContainer = styled.div`
  ${flex.justifyEvenly}
  ${flex.wrapGap}
`;

const NavbarMobileLinkWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;

  ${transitions.basic}

  &:hover {
    background-color: ${transparentize(0.5, "var(--secondary)")};
    cursor: pointer;
  }
`;

export default {
  Wrapper: NavbarMobileWrapper,
  Container: NavbarMobileContainer,
  LinkWrapper: NavbarMobileLinkWrapper,
};
