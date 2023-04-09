import _ from "lodash";
import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import useIsMobile from "../../../hooks/helpers/useIsMobile";
import { IGTNavbarOption, IGTNavbarOptions } from "../interface";
import Navbar from "../Navbar";

function GTNavbar({ children }: { children: React.ReactNode }) {
  // if is showing modal, add padding to the wrapper
  const oldScroll = useRef(0);

  // when scrolls down, hide the navbar, when scrolls up, show the navbar
  const [showNavbar, setShowNavbar] = useState(true);
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    if (window.scrollY > oldScroll.current) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    oldScroll.current = window.scrollY;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Navbar.Wrapper show={showNavbar}>
      <Navbar.Container>{children}</Navbar.Container>
    </Navbar.Wrapper>
  );
}

export default GTNavbar;

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

export const GTNavbarOptions = memo(GTNavbarOptionsTemp);

const GTNavbarOptionTemp = ({
  name,
  icon,
  children,
  onClick,
}: IGTNavbarOption) => {
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

  const handleClick = useCallback(
    (e: any) => {
      onClick?.(e, name);
    },
    [onClick, name]
  );

  return (
    <Navbar.OptionWrapper>
      <Navbar.Option
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isParent={!_.isUndefined(children)}
      >
        {isMobile && icon}

        <Navbar.Text onClick={handleClick}>{name}</Navbar.Text>

        {showPopup && !_.isUndefined(children) && (
          <Navbar.PopupWrapper>
            <Navbar.Popup isOpen={open}>{children}</Navbar.Popup>
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

export const GTNavbarOption = memo(GTNavbarOptionTemp);
