import styled from "styled-components";
import { color, flexDirection, layout, space } from "styled-system";
import { shadows, transitions } from "../../utils";
import { defaultAddOns } from "../Space/addOns/addOns";
import { ISpace } from "../Space/interface";
import { IZincStyle } from "./interface";

const ZincWrapper = styled.button<ISpace>`
  background-color: var(--secondary-0_8);
  backdrop-filter: blur(5px);
  width: fit-content;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  ${transitions.linear};
  ${shadows.simple}
  ${flexDirection};
  ${space};
  ${color};
  ${layout};
  ${defaultAddOns};

  &:active {
    background-color: var(--secondary) !important;
  }
`;

const ZincStyle: IZincStyle = {
  Wrapper: ZincWrapper,
};

export default ZincStyle;
