import React from "react";
import * as Icon from "react-feather";
import NavbarMobile from "../NavbarMobile";

function GTNavbarMobile() {
  return (
    <NavbarMobile.Wrapper>
      <NavbarMobile.Container>
        <NavbarMobile.LinkWrapper>
          <Icon.Home />
        </NavbarMobile.LinkWrapper>
        <NavbarMobile.LinkWrapper>
          <Icon.Book />
        </NavbarMobile.LinkWrapper>
        <NavbarMobile.LinkWrapper>
          <Icon.Info />
        </NavbarMobile.LinkWrapper>
      </NavbarMobile.Container>
    </NavbarMobile.Wrapper>
  );
}

export default GTNavbarMobile;
