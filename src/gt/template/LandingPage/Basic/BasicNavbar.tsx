import React from "react";
import * as Icon from "react-feather";
import {
  Button,
  GTNavbar,
  GTNavbarMobile,
  Navbar,
  NavbarMobile,
  Space,
  Text,
} from "../../../../components";

function BasicNavbar() {
  return (
    <>
      <GTNavbar>
        <Navbar.Left>
          <Navbar.Logo>GT Design</Navbar.Logo>
        </Navbar.Left>

        <Navbar.Right>
          <Navbar.Options>
            <Navbar.OptionWrapper>
              <Space.Modifiers gridGap="1rem">
                <Text.P>Pricing</Text.P>
                <Text.P>Docs</Text.P>
                <Text.P>Contact sales</Text.P>
              </Space.Modifiers>
            </Navbar.OptionWrapper>

            <Navbar.OptionWrapper>
              <Space.Modifiers gridGap="1rem">
                <Button.Contrast defaultSize="sm" fitContent px="1.25rem" py="0.5rem" borderRadius="2rem" >Log in</Button.Contrast>
              </Space.Modifiers>
            </Navbar.OptionWrapper>
          </Navbar.Options>
        </Navbar.Right>
      </GTNavbar>

      <GTNavbarMobile>
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
      </GTNavbarMobile>
    </>
  );
}

export default BasicNavbar;
