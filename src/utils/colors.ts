import { transparentize } from "polished";
import defaultConfigs from "../gt/Global/default.configs";

export const findColorThroughVar = (name: string) => {
  const starterTheme =
    localStorage.getItem("darkTheme") != null ? "darkTheme" : "theme";

  // gets the value of the variable
  let color = "";

  if (color === "") {
    // @ts-expect-error
    color = defaultConfigs.themeConfig.global[starterTheme]?.[name];
  }

  return color;
};

const root = document.documentElement;

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
    // removes all the dots
    const normalizedAmount = amount.toString().replace(".", "_");

    const transparentizeName = `--${varName}-${normalizedAmount}`;
    const color = transparentize(
      amount,
      prefer ?? findColorThroughVar(varName)
    );

    let initialValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(transparentizeName);

    const observer = new MutationObserver(() => {
      const color = prefer ?? findColorThroughVar(varName);
      const newValue = transparentize(amount, color);

      if (newValue !== initialValue) {
        root.style.setProperty(transparentizeName, newValue);

        initialValue = newValue;
      }
    });

    root.style.setProperty(transparentizeName, color);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return `var(${transparentizeName})`;
  } catch (e) {
    console.log(e, varName);
    return "transparent";
  }
};
