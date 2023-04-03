import { transparentize } from "polished";

export const findColorThroughVar = (name: string) => {
  // gets the value of the variable
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  );

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
  const color = prefer ?? findColorThroughVar(varName);

  return transparentize(amount, color);
};
