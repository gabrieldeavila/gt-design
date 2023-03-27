import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      "react",
      "react-dom",
      "styled-reset",
      "styled-components",
      "polished",
      "react-feather",
      "framer-motion",
      "prop-types",
      "lodash",
      "i18next-browser-languagedetector",
      "i18next",
      "i18next-http-backend",
      "react-i18next",
      "react-trigger-state",
      "react-datepicker",
      "date-fns",
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      uglify(),
      terser(),
      babel({
        extensions: [".js", ".ts", ".tsx"],
        exclude: "node_modules/**",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              ssr: true,
            },
          ],
        ],
      }),
    ],
  },
];
