import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "styled-components";
import GTContainer from "../Container/Container";
import { IGTDesign } from "./interface";

const defaultTheme = {
  primary: "#ffffff",
  secondary: "#f8f8ff",
  contrast: "#000000",
  backgroundHover: "#f5f5f5",
  backgroundMobileNav: "#f2f3f4",
  sunColor: "#daa520",
  moonColor: "#009698",
  btnShadow: "#000000",
  errorColor: "#ba160c",
  loginBoxPrimary: "#f0ffff",
  glowShadow: "#39ff14",
  preSelectColor: "#f5f5f5",
  pageBackground: "#f0f8ff",
  loginBackground1: "rgba(125, 197, 193, 1)",
  loginBackground2: "rgba(167, 123, 243, 1)",
  loginBackground3: "rgba(156, 194, 239, 1)",
  textBtn: "#89cff0",
  containerMain: "#f0f8ff",
  containerSecondary: "#f0fff0",
  outline: "#80daeb",
  switchOn: "#76ff7a",
  labelPrimary: "#002366",
  labelSecondary: "#66ddaa",
  buttonSuccess1: "#9ab973",
  buttonSuccess2: "#98fb98",
  buttonError1: "#8b0000",
  buttonError2: "#e66771",
};

function GTDesign({ theme, children }: IGTDesign) {
  const themeStyle = { ...defaultTheme, ...theme };

  return (
    <ThemeProvider theme={themeStyle}>
      <GTContainer.Default>{children}</GTContainer.Default>
    </ThemeProvider>
  );
}

export default GTDesign;

GTDesign.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.node.isRequired,
};

GTDesign.defaultProps = {
  theme: defaultTheme,
};
