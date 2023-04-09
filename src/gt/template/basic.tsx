/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTriggerState } from "react-trigger-state";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTDesign from "../Design/Design";
import GTCssInjectionScript from "../Global/css-global-classes";
import GlobalStyle from "../Global/style";

function GTBasic({
  children,
  noThemeChange = false,
}: {
  children: React.ReactNode;
  noThemeChange?: boolean;
}) {
  const [currTheme] = useTriggerState({ name: "currTheme" });
  const [showDarkSwitch, setShowDarkSwitch] = useState(false);

  useEffect(() => {
    setShowDarkSwitch(true);
  }, []);

  return (
    <>
      <GTDesign theme={currTheme}>
        <GlobalStyle />
        {children}
        {!noThemeChange && showDarkSwitch && (
          <DarkSwitch fixed placeX="bottom" placeY="right" />
        )}
      </GTDesign>

      <GTCssInjectionScript />
    </>
  );
}

export default GTBasic;

GTBasic.propTypes = {
  children: PropTypes.node.isRequired,
  noThemeChange: PropTypes.bool,
};
