/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTDesign from "../Design/Design";
import GTCssInjectionScript from "../Global/css-global-classes";
import GlobalStyle from "../Global/style";
import { stateStorage, useTriggerState } from "react-trigger-state";

function GTBasic({
  children,
  noThemeChange = false,
  customTranslator,
}: {
  children: React.ReactNode;
  noThemeChange?: boolean;
  customTranslator?: (key: string) => string;
}) {
  // alert("huhu");
  const [currTheme] = useTriggerState({ name: "currTheme" });
  const [showDarkSwitch, setShowDarkSwitch] = useState(false);

  useEffect(() => {
    // console.log(customTranslator);
    stateStorage.set("custom_translator", customTranslator);
  }, [customTranslator]);

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
