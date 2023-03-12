import { css } from "styled-components";
import {
  background,
  border,
  color,
  flexbox,
  fontSize,
  grid,
  layout,
  position,
  shadow,
  space
} from "styled-system";
import {
  IDefaultAddOns,
  IMobileAddOns,
  TMobileAddOnsOptions
} from "../interface";

export const defaultAddOns = css<IDefaultAddOns>`
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${background};
  ${border};
  ${position};
  ${shadow};
  ${grid};
  ${fontSize};
`;

const mobile100 = css`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const fullSpace = css`
  width: -webkit-fill-available;
  height: -webkit-fill-available;

  * {
    width: -webkit-fill-available;
  }
`;

const options: IMobileAddOns = {
  "mobile-100": mobile100,
  "full-space": fullSpace,
};

const addOnsCss = (addOns?: TMobileAddOnsOptions[]) => {
  const doIt = css`
    ${addOns?.map((addOn) => options[addOn])}
  `;

  return doIt;
};

export default addOnsCss;
