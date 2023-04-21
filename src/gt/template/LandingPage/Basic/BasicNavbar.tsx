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
                <Text.Action>Pricing</Text.Action>
                <Text.Action>Docs</Text.Action>
                <Text.Action>Contact sales</Text.Action>
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
