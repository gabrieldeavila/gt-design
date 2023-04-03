/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React from "react";
import { useTriggerState } from "react-trigger-state";
import DarkSwitch from "../../components/Switch/Template/DarkSwitch";
import GTDesign from "../Design/Design";
import GTCssInjectionScript from "../Global/css-global-classes";
import GlobalStyle from "../Global/style";

function GTBasic({
  children,
  noThemeChange,
}: {
  children: React.ReactNode;
  noThemeChange?: boolean;
}) {
  const [currTheme] = useTriggerState({ name: "currTheme" });

  return (
    <>
      <GTDesign theme={currTheme}>
        <GlobalStyle />
        {children}
        {!noThemeChange && <DarkSwitch fixed />}
      </GTDesign>

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
