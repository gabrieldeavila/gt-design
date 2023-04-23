import React from "react";
import * as components from "../../../../components";
import { IGTLandingNavbar } from "../interface";

function BasicNavbar({ logo, options }: IGTLandingNavbar) {
  return (
    <components.GTNavbar>
      <components.Space.Center>
        <components.Space.Modifiers width="1248px" justifyContent="space-between">
          <components.Navbar.Left>
            <components.Navbar.Logo>{logo}</components.Navbar.Logo>
          </components.Navbar.Left>

          <components.Navbar.Right>{options()}</components.Navbar.Right>
        </components.Space.Modifiers>
      </components.Space.Center>
    </components.GTNavbar>
  );
}

export default BasicNavbar;
