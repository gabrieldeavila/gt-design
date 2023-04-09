import { css } from "styled-components";

const basic = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem var(--btnShadow-0_9);
`;

const glow = css`
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0 0.5rem 0.1rem var(--glowShadow-0_9);
`;

const simple = css`
  box-shadow: var(--btnShadow-0_98) 0px 1px 3px 0px,
    var(--btnShadow-0_85) 0px 0px 0px 1px;
`;

const outline = css`
  box-shadow: var(--btnShadow-0_98) 0px 1px 3px 0px,
    var(--btnShadow-0_85) 0px 0px 0px 1px;
`;

const shadows = {
  basic,
  glow,
  simple,
  outline,
};

export default shadows;
