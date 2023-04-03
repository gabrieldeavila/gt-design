import { css } from "styled-components";
import { gtTransparentize } from "./colors";

const basic = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem
    ${gtTransparentize({ amount: 0.9, varName: "btnShadow" })};
`;

const glow = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem
    ${gtTransparentize({ amount: 0.9, varName: "glowShadow" })};
`;

const simple = css`
  box-shadow: ${gtTransparentize({ amount: 0.98, varName: "btnShadow" })}0px 1px 3px 0px, ${gtTransparentize({ amount: 0.85, varName: "btnShadow" })} 0px 0px 0px 1px;
`;

const outline = css`
  box-shadow: ${gtTransparentize({ amount: 0.98, varName: "btnShadow" })}0px 1px 3px 0px, ${gtTransparentize({ amount: 0.85, varName: "btnShadow" })} 0px 0px 0px 1px;
`;

const shadows = {
  basic,
  glow,
  simple,
  outline,
};

export default shadows;
