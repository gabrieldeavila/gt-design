import React, { useCallback } from "react";
import * as Icon from "react-feather";
import {
  GTNavbar,
  GTNavbarMobile,
  Navbar,
  NavbarMobile,
  Popup,
  Text,
} from "../../../components";
import {
  GTNavbarOption,
  GTNavbarOptions,
} from "../../../components/Navbar/Template/Navbar";
import GTSymbolPopup from "../../../components/Popup/Template/BasicPopup";
import { GTBasic } from "../../../gt";

export default {
  title: "Templates/Navbars/Options Click",
};

const Template = () => {
  // TO DO: REMOVE ANY FROM ALL EVENT HANDLERS
  const handleClick = useCallback((e: any, name: string) => {
    alert(name);
  }, []);

  return (
    <GTBasic noThemeChange>
      <GTNavbar>
        <Navbar.Left>
          <Navbar.Logo>
            <Navbar.Title>GT</Navbar.Title>
          </Navbar.Logo>
          <GTNavbarOptions>
            <GTNavbarOption
              onClick={handleClick}
              name="Home"
              icon={<Icon.Home />}
            />
            <GTNavbarOption
              onClick={handleClick}
              name="Projects"
              icon={<Icon.Book />}
            />
            <GTNavbarOption
              onClick={handleClick}
              name="About"
              icon={<Icon.Info />}
            />
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

export const OptionsClick = Template.bind({});
