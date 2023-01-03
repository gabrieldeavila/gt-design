import React, { memo, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useEaseClose from "../../hooks/helpers/useEaseClose";
import animations from "../../utils/animations";
import useOnClickOutside from "../../hooks/helpers/useOnClickOutside";
import shadows from "../../utils/shadows";

const PopupWrapperStyled = styled.div`
  margin-top: 0.5rem;
  position: absolute;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.contrast};
  ${shadows.basic}
  border-radius: 0.25rem;
  min-width: 15rem;
  min-height: 7rem;
  top: 100%;
  right: 0;
  display: ${(props: { easeClose: boolean; open: boolean }) =>
    props.easeClose ? "block" : "none"};
  animation: ${(props) =>
    props.open
      ? "popup 0.2s ease-in-out forwards"
      : "popupReverse 0.2s ease-in-out forwards"};

  ${animations.easeOpenClose}
`;

const PopupContainer = styled.div`
  position: relative;
  margin: 1rem;
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
