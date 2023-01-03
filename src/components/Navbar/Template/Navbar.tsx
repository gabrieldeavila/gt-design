import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import Navbar from "../Navbar";
import Symbol from "../../Symbol/Symbol";
import useIsMobile from "../../../hooks/helpers/useIsMobile";
import SymbolPopup from "../../Popup/Template/BasicPopup";
import { IGTNavbarOption, IGTNavbarOptions } from "../interface";
import Logo from "../../../stories/logo";

function GTNavbar() {
  // if is showing modal, add padding to the wrapper
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
    <Navbar.Wrapper show={showNavbar}>
      <Navbar.Container>
        <Navbar.Left>
          <Navbar.Logo>
            <Logo />
          </Navbar.Logo>
          {/* <Navbar.Title>GT</Navbar.Title> */}
          <GTNavbarOptions>
            <GTNavbarOption name="Home" icon={<Icon.Home />}>
              <Navbar.SubText>Home</Navbar.SubText>
              <Navbar.SubText>Home</Navbar.SubText>
              <Navbar.SubText>Home</Navbar.SubText>
            </GTNavbarOption>
            <GTNavbarOption name="Projects" icon={<Icon.Book />}>
              <Navbar.SubText>Projects</Navbar.SubText>
              <Navbar.SubText>Projects</Navbar.SubText>
              <Navbar.SubText>Projects</Navbar.SubText>
            </GTNavbarOption>
            <GTNavbarOption name="About" icon={<Icon.Info />}>
              <Navbar.SubText>About</Navbar.SubText>
              <Navbar.SubText>About</Navbar.SubText>
              <Navbar.SubText>About</Navbar.SubText>
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

const GTNavbarOptions = memo(GTNavbarOptionsTemp);

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

const GTNavbarOption = memo(GTNavbarOptionTemp);
