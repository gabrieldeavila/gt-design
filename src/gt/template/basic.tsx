/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTProvider from "../../context/gt";
import GTDesign from "../Design/Design";
import GlobalStyle from "../Global/style";
import GTCssInjectionScript from "../Global/css-global-classes";

const darkThemeStyle = {
  primary: "#080808",
  secondary: "#242124",
  contrast: "#fffafa",
  backgroundHover: "#80808061",
  backgroundMobileNav: "#555d50",
  sunColor: "#b8860b",
  moonColor: "#00b7eb",
  btnShadow: "#ffff",
  errorColor: "#cd853f",
  pageBackground: "#242124",
  textBtn: "#77b5fe",
  containerMain: "#36454f",
  containerSecondary: "#242124",
  preSelectColor: "#414a4c",
  labelPrimary: "#00ced1",
  labelSecondary: "#2a52be",
  labelRequired: "#00fa9a",
  glowShadow: "#44d7a8",
  buttonSuccess1: "#00ff00",
  buttonSuccess2: "#264348",
  buttonError1: "#8b0000",
  buttonError2: "#7c4848",
  switchNormalBackground: "#808080",
  switchNormalActive: "#2a52be",
  outlineError: "#e34234",
};

// add a cookie instead of localstorage
const initialTheme = () => {
  try {
    return localStorage?.getItem("darkTheme") === "1";
  } catch (e) {
    return false;
  }
};

function GTBasic({
  children,
  noThemeChange,
}: {
  children: React.ReactNode;
  noThemeChange?: boolean;
}) {
  const [darkTheme, setDarkTheme] = useState(initialTheme());

  const theme = useMemo(() => darkTheme && darkThemeStyle, [darkTheme]);

  return (
    <>
      <GTProvider darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <GTDesign theme={theme}>
          <GlobalStyle />
          {children}
          {!noThemeChange && <DarkSwitch fixed />}
        </GTDesign>
      </GTProvider>

      <div>lmao</div>
      <GTCssInjectionScript />
    </>
  );
}

export default GTBasic;

GTBasic.propTypes = {
  children: PropTypes.node.isRequired,
  noThemeChange: PropTypes.bool,
};

GTBasic.defaultProps = {
  noThemeChange: false,
};
