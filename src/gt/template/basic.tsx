/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { globalState, useTriggerState } from "react-trigger-state";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTDesign from "../Design/Design";
import GTCssInjectionScript from "../Global/css-global-classes";
import GlobalStyle from "../Global/style";

function GTBasic({
  children,
  noThemeChange = false,
  serverTranslation,
  lang
}: {
  children: React.ReactNode;
  noThemeChange?: boolean;
  serverTranslation?: any;
  lang?: any;
}) {
  const [currTheme] = useTriggerState({ name: "currTheme" });
  const [showDarkSwitch, setShowDarkSwitch] = useState(false);

  // adds here because when is ssr, the state is not set
  // but it will not trigger any re-render, since we are using globalState
  globalState.set("server_translation", serverTranslation);
  globalState.set("lang", lang);

  // when is ssr, we don't know if the user has a preference
  // otherwise, we'd get an hydration error
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
