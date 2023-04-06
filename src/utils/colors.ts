import defaultConfigs from "../gt/Global/default.configs";
import { transparentize } from "polished";

const starterTheme =
  localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";

export const findColorThroughVar = (name: string) => {
  // gets the value of the variable
  let color = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  );

  if (color === "") {
    color = defaultConfigs.themeConfig.global[starterTheme]?.[name];
  }

  return color;
};

export const gtTransparentize = ({
  amount,
  varName,
  prefer,
}: {
  amount: number;
  varName: string;
  prefer?: string;
}) => {
  try {
    const color = prefer ?? findColorThroughVar(varName);

    return transparentize(amount, color);
  } catch (e) {
    // console.log(e, varName);
    return "transparent";
  }
};
