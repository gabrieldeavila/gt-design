import React, { useMemo, useState } from "react";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTProvider from "../../context/gt";
import GTDesign from "../Design/Design";
import GlobalStyle from "../Global/style";

const darkThemeStyle = {
  primary: "#080808",
  secondary: "#242124",
  contrast: "#fffafa",
  backgroundHover: "#696969",
  backgroundMobileNav: "#555d50",
  sunColor: "#b8860b",
  moonColor: "#00b7eb",
  btnShadow: "#ffff",
  errorColor: "#cd853f",
  pageBackground: "#242124",
  textBtn: "#77b5fe",
  containerMain: "#36454f",
  containerSecondary: "#242124",
};

function GTBasic({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("darkTheme") === "1"
  );

  const theme = useMemo(() => darkTheme && darkThemeStyle, [darkTheme]);

  return (
    <GTProvider darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
      <GTDesign theme={theme}>
        <GlobalStyle />
        {children}

        <DarkSwitch fixed />
      </GTDesign>
    </GTProvider>
  );
}

export default GTBasic;
