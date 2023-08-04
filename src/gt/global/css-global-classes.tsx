/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from "react";
import {
  globalState,
  stateStorage,
  useTriggerState,
} from "react-trigger-state";
import { gtTransparentize, transparentizedColors } from "../../utils/colors";
import defaultConfigs from "./default.configs";

const getCustomConfigs = () => {
  try {
    // get the path to the babel.config.js file
    const userConfigs = { themeConfig: globalState.get("theme_config") ?? {} };

    // merge the user configs with the default configs
    const mergedConfigs = {
      ...defaultConfigs,
      ...userConfigs,
    };

    // also merge the themes (if any)
    if (userConfigs.themeConfig?.global) {
      mergedConfigs.themeConfig.global.theme = {
        ...defaultConfigs.themeConfig.global.theme,
        ...userConfigs.themeConfig.global.theme,
      };

      mergedConfigs.themeConfig.global.darkTheme = {
        ...defaultConfigs.themeConfig.global.darkTheme,
        ...userConfigs.themeConfig.global.darkTheme,
      };
    } else {
      return defaultConfigs;
    }

    return mergedConfigs;
  } catch (e) {
    return defaultConfigs;
  }
};

const GTCssInjectionScript = () => {
  const [theme] = useTriggerState({ name: "curr_theme" });

  useEffect(() => {
    (async () => {
      const configs =
        process.env.PROJECT_DEV_MODE === "TRUE"
          ? defaultConfigs
          : getCustomConfigs();

      stateStorage.set("gtConfigs", configs);

      const root = document.documentElement;
      const colorMode =
        theme ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "darkTheme"
          : "theme");

      const colors = configs.themeConfig.global[colorMode];

      stateStorage.set("gt_theme_colors", colors);
      Object.keys(colors).forEach((key) => {
        root.style.setProperty(`--${key}`, colors[key]);
      });

      for (const color of transparentizedColors) {
        gtTransparentize(color);
      }
    })().catch((e) => console.log(e));
  }, [theme]);

  const codeToRunOnClient = `
  (async function() {
    const getCustomConfigsBeforeMount = () => {
      const defaultConfigs = ${JSON.stringify(getCustomConfigs())};
      try {
        // get the path to the babel.config.js file
        const userConfigs = { themeConfig: ${JSON.stringify(
          globalState.get("theme_config")
        )} };

        // merge the user configs with the default configs
        const mergedConfigs = {
          ...defaultConfigs
        };
    
        // also merge the themes (if any)
        if (userConfigs.themeConfig?.global) {
          mergedConfigs.themeConfig.global.theme = {
            ...defaultConfigs.themeConfig.global.theme,
            ...userConfigs.themeConfig.global.theme,
          };
    
          mergedConfigs.themeConfig.global.darkTheme = {
            ...defaultConfigs.themeConfig.global.darkTheme,
            ...userConfigs.themeConfig.global.darkTheme,
          };
        }
    
        return mergedConfigs;
      } catch (e) {
        return defaultConfigs;
      }
    };
  
    const colorMode = (localStorage.getItem("theme") != null ? localStorage.getItem("theme") === "darkTheme" : (window.matchMedia("(prefers-color-scheme: dark)").matches))
    ? "darkTheme"
    : "theme";
    const root = document.documentElement;
    const themeConfigs = getCustomConfigsBeforeMount();

    const opacities = ${JSON.stringify(transparentizedColors)}
  
    function transparentizeColor(hexCode, alpha) {
      // Remove the '#' symbol if present
      hexCode = hexCode.replace(/^#/, '');
    
      // Check if the input is a valid hexadecimal color code
      if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
          console.log(hexCode)
        throw new Error('Invalid hexadecimal color code');
      }
    
      // If the input is a shorthand 3-digit hexadecimal, expand it to 6-digit
      if (hexCode.length === 3) {
        hexCode = hexCode
          .split('')
          .map(c => c + c)
          .join('');
      }
    
      // Extract the Red, Green, and Blue components from the hexadecimal code
      const red = parseInt(hexCode.substring(0, 2), 16);
      const green = parseInt(hexCode.substring(2, 4), 16);
      const blue = parseInt(hexCode.substring(4, 6), 16);
    
      // Ensure the alpha value is within the valid range [0, 1]
      alpha = 1 - Math.min(Math.max(alpha || 1, 0), 1);
    
      return \`rgba(\${red}, \${green}, \${blue}, \${alpha.toFixed(1)})\`;
    }
  
    const colors = themeConfigs.themeConfig.global[colorMode];
    Object.keys(colors).forEach((key) => {
      root.style.setProperty("--"+key, colors[key]);
    });
  
    for (const {amount, varName} of opacities) {
      const colorToTransparentize = varName.split("-")[0];
      const color = themeConfigs.themeConfig.global[colorMode]?.[colorToTransparentize];
      const newColor = transparentizeColor(color, amount);
      document.documentElement.style.setProperty("--"+varName, newColor);
    }
  })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default GTCssInjectionScript;
