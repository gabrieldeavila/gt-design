import { transparentize } from "polished";
import { css } from "styled-components";

const basic = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem
    ${transparentize(0.9, "var(--btnShadow)")};
`;

const glow = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem
    ${transparentize(0.9, "var(--glowShadow)")};
`;

const simple = css`
  box-shadow: ${transparentize(0.98, "var(--btnShadow)")} 0px 1px
      3px 0px,
    ${transparentize(0.85, "var(--btnShadow)")} 0px 0px 0px 1px;
`;

const outline = css`
  box-shadow: ${transparentize(0.98, "var(--btnShadow)")} 0px 1px
      3px 0px,
    ${transparentize(0.85, "var(--btnShadow)")} 0px 0px 0px 1px;
`;

const shadows = {
  basic,
  glow,
  simple,
  outline,
};

export default shadows;
