/* eslint-disable multiline-ternary */
import React, { useState, useCallback } from "react";
import { IGTLandingNavbar } from "../interface";
import useGTTranslate from "../../../Global/translate";
import useIsMobile from "../../../../hooks/helpers/useIsMobile";
import { Button, GTNavbar, Navbar, Space, Text } from "../../../../components";
import { X } from "react-feather";

function BasicNavbar({ logo, options, button }: IGTLandingNavbar) {
  const { translateThis } = useGTTranslate();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [tempShowMobileMenu, setTempShowMobileMenu] = useState(false);

  const handleOpenMobile = useCallback(() => {
    setShowMobileMenu(true);
    setTempShowMobileMenu(true);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setTempShowMobileMenu(false);
    setTimeout(() => {
      setShowMobileMenu(false);
    }, 300);
  }, []);

  return (
    <>
      <GTNavbar>
        <Space.Center>
          <Space.Modifiers width="1248px" justifyContent="space-between">
            <Navbar.Left>
              <Navbar.Logo>{logo}</Navbar.Logo>
            </Navbar.Left>

            {!isMobile ? (
              <Navbar.Right>
                {
                  <Navbar.Options>
                    <Navbar.OptionWrapper>
                      <Space.Modifiers gridGap="1rem">
                        {options.map((option, index) => (
                          <Text.Action onClick={option.onClick} key={index}>
                            {translateThis(option.description)}
                          </Text.Action>
                        ))}
                      </Space.Modifiers>
                    </Navbar.OptionWrapper>

                    <Navbar.OptionWrapper>
                      <Space.Modifiers gridGap="1rem">
                        <Button.Contrast
                          defaultSize="sm"
                          fitContent
                          px="1.25rem"
                          py="0.5rem"
                          borderRadius="2rem"
                          onClick={button.onClick}
                        >
                          {translateThis(button.description)}
                        </Button.Contrast>
                      </Space.Modifiers>
                    </Navbar.OptionWrapper>
                  </Navbar.Options>
                }
              </Navbar.Right>
            ) : (
              <Navbar.Right>
                <X onClick={handleOpenMobile} className="navbar-x" />
              </Navbar.Right>
            )}
          </Space.Modifiers>
        </Space.Center>
      </GTNavbar>

      {showMobileMenu && (
        <Navbar.Mobile.Wrapper isOpen={tempShowMobileMenu}>
          <Space.Modifiers
            mb="1rem"
            pl="0.2rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text.Title mb="0" fontSize="1.2rem !important">
              {logo}
            </Text.Title>

            <X onClick={handleCloseMobile} className="navbar-x" />
          </Space.Modifiers>
          <Space.Modifiers flexDirection="column" gridGap="1rem">
            {options.map((option, index) => (
              <Text.Action
                textAlign="left"
                onClick={option.onClick}
                key={index}
              >
                {translateThis(option.description)}
              </Text.Action>
            ))}
          </Space.Modifiers>

          <Space.Modifiers pt="2rem">
            <Button.Contrast
              defaultSize="sm"
              fitContent
              px="1.25rem"
              py="0.5rem"
              borderRadius="2rem"
              onClick={button.onClick}
            >
              {translateThis(button.description)}
            </Button.Contrast>
          </Space.Modifiers>
        </Navbar.Mobile.Wrapper>
      )}
    </>
  );
}

export default BasicNavbar;
