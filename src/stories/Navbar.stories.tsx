import React from "react";
import * as Icon from "react-feather";
import {
  GTNavbar,
  GTNavbarMobile,
  Navbar,
  NavbarMobile,
  Popup,
  Text,
} from "../components";
import {
  GTNavbarOption,
  GTNavbarOptions,
} from "../components/Navbar/Template/Navbar";
import GTSymbolPopup from "../components/Popup/Template/BasicPopup";
import { GTBasic } from "../gt";
import Logo from "./logo";

export default {
  title: "GTDesign/Navbar",
};

const Template = function NavbarStory() {
  const img = "https://thispersondoesnotexist.com/image";

  return (
    <GTBasic noThemeChange>
      <GTNavbar>
        <Navbar.Left>
          <Navbar.Logo>
            <Logo />
          </Navbar.Logo>
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
              <GTSymbolPopup alt="GT DESIGN">
                <Popup.Container>
                  <Popup.Item>
                    <Text.P>nothing here!</Text.P>
                  </Popup.Item>
                </Popup.Container>
              </GTSymbolPopup>
            </Navbar.OptionWrapper>

            <Navbar.OptionWrapper>
              <GTSymbolPopup img={img} alt="Img Example">
                <Popup.Container>
                  <Popup.Item>
                    <Text.P>
                      Signed as
                      <Text.Strong> gt design</Text.Strong>
                    </Text.P>
                  </Popup.Item>
                </Popup.Container>

                <Popup.Container>
                  <Popup.Item>
                    <Text.P>Your profile</Text.P>
                  </Popup.Item>
                  <Popup.Item>
                    <Text.P>Your projects</Text.P>
                  </Popup.Item>
                  <Popup.Item>
                    <Text.P>Your settings</Text.P>
                  </Popup.Item>
                </Popup.Container>

                <Popup.Container>
                  <Popup.Item>
                    <Text.P>Sign out</Text.P>
                  </Popup.Item>
                </Popup.Container>
              </GTSymbolPopup>
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
    </GTBasic>
  );
};

export const NavbarEx = Template.bind({});
