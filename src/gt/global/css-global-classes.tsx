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
  const [changedTheme] = useTriggerState({ name: "changedTheme" });

  useEffect(() => {
    (async () => {
      const configs =
        process.env.PROJECT_DEV_MODE === "TRUE"
          ? defaultConfigs
          : await getCustomConfigs();

      stateStorage.set("gtConfigs", configs);

      const root = document.documentElement;
      const firstTime = localStorage.getItem("firstTime") == null;

      const colorMode =
        localStorage.getItem("darkTheme") != null ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches && firstTime)
          ? "darkTheme"
          : "theme";

      localStorage.setItem("firstTime", "false");

      const colors = configs.themeConfig.global[colorMode];

      Object.keys(colors).forEach((key) => {
        root.style.setProperty(`--${key}`, colors[key]);
      });

      for (const color of transparentizedColors) {
        gtTransparentize(color);
      }
    })().catch((e) => console.log(e));
  }, [changedTheme]);

  const codeToRunOnClient = `
(async function() {
  const getCustomConfigsBeforeMount = () => {
    try {
      const defaultConfigs = ${JSON.stringify(defaultConfigs)};

      // get the path to the babel.config.js file
      const userConfigs = { themeConfig: ${JSON.stringify(
        globalState.get("theme_config")
      )} };
  
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
      }
  
      return mergedConfigs;
    } catch (e) {
      return defaultConfigs;
    }
  };

  const colorMode = localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";
  const root = document.documentElement;
  const defaultConfigs = getCustomConfigsBeforeMount();
  console.log(defaultConfigs);
  const opacities = ${JSON.stringify(transparentizedColors)}
  console.log(themeConfigs, "aqui?");
  // console.log(themeConfigs());

  function transparentizeColor(color, opacity) {
    // Convert hex color to RGB format
    if (color.startsWith("#")) {
      color = color.substring(1);
    }
    if (color.length === 3) {
      color = color + color;
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
  
    // Calculate new RGBA values
    const opacityy = 1 - opacity
    const rgba = "rgba("+r+","+g+","+b+","+opacityy+")";
    return rgba;
  }

  const colors = themeConfigs.themeConfig.global[colorMode];
  Object.keys(colors).forEach((key) => {
    root.style.setProperty("--"+key, colors[key]);
  });

  const starterTheme = localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";

  for (const {amount, varName} of opacities) {
    const colorToTransparentize = varName.split("-")[0];
    const color = themeConfigs.themeConfig.global[starterTheme]?.[colorToTransparentize];
    const newColor = transparentizeColor(color, amount);
    document.documentElement.style.setProperty("--"+varName, newColor);
  }
}, 2)

})()`;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default GTCssInjectionScript;
