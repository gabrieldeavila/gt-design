import { transparentize } from "polished";
import PropTypes from "prop-types";
import React, { memo, useRef } from "react";
import styled from "styled-components";
import useEaseClose from "../../hooks/helpers/useEaseClose";
import useOnClickOutside from "../../hooks/helpers/useOnClickOutside";
import animations from "../../utils/animations";
import shadows from "../../utils/shadows";
import { IPopupWrapper } from "./interface";

const PopupWrapperStyled = styled.div`
  margin-top: 0.25rem;
  position: fixed;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.contrast};
  border-radius: 0.25rem;
  min-width: 10rem;
  min-height: 7rem;
  top: 100%;
  right: 18px;
  display: ${(props: { easeClose: boolean; open: boolean }) =>
    props.easeClose ? "block" : "none"};
  animation: ${(props) =>
    props.open
      ? "popup 0.2s ease-in-out forwards"
      : "popupReverse 0.2s ease-in-out forwards"};

  ${shadows.simple};
  ${animations.easeOpenClose}
`;

const PopupContainer = styled.div`
  position: relative;
  padding: 0.5rem 0rem;
  border-bottom: 1px solid
    ${(props) => transparentize(0.5, props.theme.contrast)};

  &:last-child {
    border-bottom: none;
  }

  /* only in the first lane children */
  & > * {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }
`;

const PopupItem = styled.a`
  display: block;
  cursor: pointer;

  &:hover {
    background: ${(props) => transparentize(0, props.theme.backgroundHover)};
  }
`;

// there are two consts because memo doesn't work with proptypes
const PopupWrapperComp = ({
  children,
  open,
  setOpen,
  avoidComponents,
}: IPopupWrapper) => {
  const easeClose = useEaseClose(open);
  const ref = useRef(null);

  useOnClickOutside(ref, avoidComponents, () => setOpen(false));

  return (
    <PopupWrapperStyled ref={ref} easeClose={easeClose} open={open}>
      {children}
    </PopupWrapperStyled>
  );
};

const PopupWrapper = memo(PopupWrapperComp);

const Popup = {
  Wrapper: PopupWrapper,
  Container: PopupContainer,
  Item: PopupItem,
};

export default Popup;

PopupWrapperComp.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  avoidComponents: PropTypes.array,
  children: PropTypes.node.isRequired,
};

PopupWrapperComp.defaultProps = {
  open: false,
  setOpen: () => {},
  avoidComponents: [],
};
