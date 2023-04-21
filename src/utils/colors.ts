/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { transparentize } from "polished";
import defaultConfigs from "../gt/Global/default.configs";

interface ServerColorsType {
  varName: string;
  amount: number;
}

export const transparentizedColors: ServerColorsType[] = [
  {
    varName: "primary-0_1",
    amount: 0.1,
  },
  {
    varName: "primary-0_2",
    amount: 0.2,
  },
  {
    varName: "primary-0_5",
    amount: 0.5,
  },
  {
    varName: "primary-0_8",
    amount: 0.8,
  },
  {
    varName: "contrast-0_1",
    amount: 0.1,
  },
  {
    varName: "contrast-0_9",
    amount: 0.9,
  },
  {
    varName: "contrast-0_5",
    amount: 0.5,
  },
  {
    varName: "outlineError-0_5",
    amount: 0.5,
  },
  {
    varName: "outline-0_5",
    amount: 0.5,
  },
  {
    varName: "outline-0_9",
    amount: 0.9,
  },
  {
    varName: "secondary-0_7",
    amount: 0.7,
  },
  {
    varName: "secondary-0_5",
    amount: 0.5,
  },
  {
    varName: "secondary-0_1",
    amount: 0.1,
  },
  {
    varName: "secondary-0_2",
    amount: 0.2,
  },
  {
    varName: "secondary-0_8",
    amount: 0.8,
  },
  {
    varName: "secondary-0_99",
    amount: 0.99,
  },
  {
    varName: "contrast-0_7",
    amount: 0.7,
  },
  {
    varName: "backgroundHover-0_01",
    amount: 0.01,
  },
  {
    varName: "switchNormalActive-0_25",
    amount: 0.25,
  },
  {
    varName: "switchNormalBackground-0_25",
    amount: 0.25,
  },
  {
    varName: "btnShadow-0_9",
    amount: 0.9,
  },
  {
    varName: "btnShadow-0_98",
    amount: 0.98,
  },
  {
    varName: "btnShadow-0_85",
    amount: 0.85,
  },
  {
    varName: "glowShadow-0_9",
    amount: 0.9,
  },
];

export const gtTransparentize = ({
  amount,
  varName,
}: {
  amount: number;
  varName: string;
}) => {
  try {
    // find the color to transparentize
    // ex.: varName = "primary-0_1"
    // colorToTransparentize = "primary"
    const colorToTransparentize = varName.split("-")[0];

    const starterTheme =
      localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";

    const color =
      // @ts-expect-error
      defaultConfigs.themeConfig.global[starterTheme]?.[colorToTransparentize];

    if (typeof window !== "undefined") {
      const newColor = transparentize(amount, color);

      document.documentElement.style.setProperty(`--${varName}`, newColor);
    }
  } catch (e) {
    console.log(e, "something went wrong");
  }
};
