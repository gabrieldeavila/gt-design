import React from "react";
import * as Icon from "react-feather";
import {
  Box,
  GTNavbar,
  MotionBox,
  Navbar,
  Popup,
  Space,
  Symbol,
  Text,
} from "../components";
import {
  GTNavbarOption,
  GTNavbarOptions,
} from "../components/Navbar/Template/Navbar";
import GTSymbolPopup from "../components/Popup/Template/BasicPopup";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";
import Logo from "./logo";

export default {
  title: "GTDesign/Navbar",
};

const Template = function NavbarStory() {
  const img = "https://thispersondoesnotexist.com/image";

  return (
    <GTBasic>
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
              <Symbol.Container>
                <Symbol.Text>G</Symbol.Text>
              </Symbol.Container>
            </Navbar.OptionWrapper>
            <Navbar.OptionWrapper>
              <GTSymbolPopup img={img} alt={"Img Example"}>
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

      <Space.Main>
        <SectionContainer title="Box" subtitle="STORIES.BOX.SUBTITLE" />
        <Box.Column>
          {[
            "#e0ffff",
            "#98fb98",
            "black",
            "white",
            "#a0d6b4",
            "#66ddaa",
            "#00a693",
            "#00a86b",
            "#ffddf4",
            "#7cfc00",
            "#cae00d",
            "#db7093",
            "#7b68ee",
            "#8a2be2",
            "#4b0082",
            "#008080",
            "#00ced1",
            "#00bfff",
            "#00bfff",
            "#00bfff",
            "#00bfff",
            "#00ffff",
            "#00ffff",
            "#ff00ff",
          ].map((bg, index) => (
            <MotionBox bg={bg} key={index}>
              （⊙ｏ⊙）
            </MotionBox>
          ))}
        </Box.Column>
      </Space.Main>
    </GTBasic>
  );
};

export const NavbarEx = Template.bind({});
