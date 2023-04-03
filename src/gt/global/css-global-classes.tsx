import { useEffect } from "react";

const GTCssInjectionScript = () => {
  useEffect(() => {
    (async () => {
      try {
        // get the path to the babel.config.js file
        const path =
          process.env.PROJECT_DEV_MODE === "TRUE"
            ? "../../../gt-design.config.js"
            : "gt-design.config.js";
        console.log(path);

        const babelConfig2 = await import(path);
        console.log(babelConfig2);
      } catch (e) {
        console.log(e);
      }
    })().catch((e) => console.log(e));
  }, []);

  return null;
};

export default GTCssInjectionScript;
