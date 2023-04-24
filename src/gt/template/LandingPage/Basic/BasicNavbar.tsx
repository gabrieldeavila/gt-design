import React from "react";
import * as components from "../../../../components";
import { IGTLandingNavbar } from "../interface";
import useGTTranslate from "../../../Global/translate";

function BasicNavbar({ logo, options, button }: IGTLandingNavbar) {
  const { translateThis } = useGTTranslate();

  return (
    <components.GTNavbar>
      <components.Space.Center>
        <components.Space.Modifiers
          width="1248px"
          justifyContent="space-between"
        >
          <components.Navbar.Left>
            <components.Navbar.Logo>{logo}</components.Navbar.Logo>
          </components.Navbar.Left>

          <components.Navbar.Right>
            {
              <components.Navbar.Options>
                <components.Navbar.OptionWrapper>
                  <components.Space.Modifiers gridGap="1rem">
                    {options.map((option, index) => (
                      <components.Text.Action
                        onClick={option.onClick}
                        key={index}
                      >
                        {translateThis(option.description)}
                      </components.Text.Action>
                    ))}
                  </components.Space.Modifiers>
                </components.Navbar.OptionWrapper>

                <components.Navbar.OptionWrapper>
                  <components.Space.Modifiers gridGap="1rem">
                    <components.Button.Contrast
                      defaultSize="sm"
                      fitContent
                      px="1.25rem"
                      py="0.5rem"
                      borderRadius="2rem"
                      onClick={button.onClick}
                    >
                      {translateThis(button.description)}
                    </components.Button.Contrast>
                  </components.Space.Modifiers>
                </components.Navbar.OptionWrapper>
              </components.Navbar.Options>
            }
          </components.Navbar.Right>
        </components.Space.Modifiers>
      </components.Space.Center>
    </components.GTNavbar>
  );
}

export default BasicNavbar;
