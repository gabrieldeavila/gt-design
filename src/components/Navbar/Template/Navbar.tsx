import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import Navbar from "../Navbar";
import Symbol from "../../Symbol/Symbol";
import useIsMobile from "../../../hooks/helpers/useIsMobile";
import SymbolPopup from "../../Popup/Template/BasicPopup";
import { IGTNavbarOption, IGTNavbarOptions } from "../interface";

function GTNavbar({ showModal }: { showModal: boolean }) {
  // if is showing modal, add padding to the wrapper
  const wrapperStyle = showModal ? 14 : 0;
  const oldScroll = useRef(0);

  // when scrolls down, hide the navbar, when scrolls up, show the navbar
  const [showNavbar, setShowNavbar] = useState(true);
  const handleScroll = useCallback(() => {
    if (window.scrollY > oldScroll.current) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    oldScroll.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Navbar.Wrapper show={showNavbar} mr={wrapperStyle}>
      <Navbar.Container>
        <Navbar.Left>
          <Navbar.Title>Gt Design</Navbar.Title>
          <GTNavbarOptions>
            <GTNavbarOption name="Home" icon={<Icon.Home />}>
              <Navbar.Text>Home</Navbar.Text>
              <Navbar.Text>Home</Navbar.Text>
              <Navbar.Text>Home</Navbar.Text>
            </GTNavbarOption>
            <GTNavbarOption name="Projects" icon={<Icon.Book />}>
              <Navbar.Text>Projects</Navbar.Text>
              <Navbar.Text>Projects</Navbar.Text>
              <Navbar.Text>Projects</Navbar.Text>
            </GTNavbarOption>
            <GTNavbarOption name="About" icon={<Icon.Info />}>
              <Navbar.Text>About</Navbar.Text>
              <Navbar.Text>About</Navbar.Text>
              <Navbar.Text>About</Navbar.Text>
            </GTNavbarOption>
          </GTNavbarOptions>
        </Navbar.Left>

        <Navbar.Right>
          <Navbar.Options>
            <Navbar.OptionWrapper>
              <Symbol.Container>
                <Symbol.Text>G</Symbol.Text>
              </Symbol.Container>
            </Navbar.OptionWrapper>
            <Navbar.OptionWrapper>
              <SymbolPopup />
            </Navbar.OptionWrapper>
          </Navbar.Options>
        </Navbar.Right>
      </Navbar.Container>
    </Navbar.Wrapper>
  );
}

export default GTNavbar;

GTNavbar.propTypes = {
  showModal: PropTypes.bool,
};

GTNavbar.defaultProps = {
  showModal: false,
};

const GTNavbarOptionsTemp = ({ children }: IGTNavbarOptions) => {
  const isMobile = useIsMobile();
  const [windowHeight, setWindowHeight] = useState(100);
  const componentRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // if it's mobile, get the window height
    if (isMobile) {
      // get the window height
      const height = window.innerHeight;
      const compHeight = componentRef.current.clientHeight;

      // set the body height
      setWindowHeight(height - compHeight);
    }
  }, [isMobile, setWindowHeight]);

  return (
    <Navbar.Options top={windowHeight} ref={componentRef}>
      {children}
    </Navbar.Options>
  );
};

GTNavbarOptionsTemp.propTypes = {
  children: PropTypes.node.isRequired,
};

const GTNavbarOptions = memo(GTNavbarOptionsTemp)

const GTNavbarOptionTemp = ({ name, icon, children }: IGTNavbarOption) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isMobile = useIsMobile();

  const handleMouseEnter = useCallback(() => {
    setShowPopup(true);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);

    setTimeout(() => {
      setShowPopup(false);
    }, 200);
  }, []);

  return (
    <Navbar.OptionWrapper>
      <Navbar.Option
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMobile && icon}
        <Navbar.Text>{name}</Navbar.Text>
        {showPopup && (
          <Navbar.PopupWrapper>
            <Navbar.Popup open={open}>{children}</Navbar.Popup>
          </Navbar.PopupWrapper>
        )}
      </Navbar.Option>
    </Navbar.OptionWrapper>
  );
};

GTNavbarOptionTemp.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  name: PropTypes.string.isRequired,
};

GTNavbarOptionTemp.defaultProps = {
  icon: null,
};

const GTNavbarOption = memo(GTNavbarOptionTemp)