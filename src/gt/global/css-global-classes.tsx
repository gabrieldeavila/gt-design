import React, { useEffect } from "react";
import defaultConfigs from "./default.configs";
import { useTriggerState } from "react-trigger-state";

const getCustomConfigs = async () => {
  try {
    // get the path to the babel.config.js file
    const path = "gt-design.config.js";
    const customConfigs = await import(path);

    return customConfigs.default;
  } catch (e) {
    return defaultConfigs;
  }
};

const GTCssInjectionScript = () => {
  const [changedTheme] = useTriggerState({ name: "changedTheme" });

  useEffect(() => {
    (async () => {
      alert("a");

      const configs =
        process.env.PROJECT_DEV_MODE === "TRUE"
          ? defaultConfigs
          : await getCustomConfigs();

      const root = document.documentElement;

      const colorMode =
        localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";

      const colors = configs.themeConfig.global[colorMode];

      Object.keys(colors).forEach((key) => {
        root.style.setProperty(`--${key}`, colors[key]);
      });
    })().catch((e) => console.log(e));
  }, [changedTheme]);

  const codeToRunOnClient = `
(function() {
  alert("a");

  console.log("it works")
  const colorMode = localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";
  const root = document.documentElement;
  const defaultConfigs = ${JSON.stringify(defaultConfigs)};

  console.log(defaultConfigs.themeConfig.global[colorMode]);

  const colors = defaultConfigs.themeConfig.global[colorMode];

        Object.keys(colors).forEach((key) => {
          console.log(key, colors[key], "tá lá")
        root.style.setProperty("--"+key, colors[key]);
      });
})()`;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default GTCssInjectionScript;
