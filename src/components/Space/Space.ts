import { transparentize } from "polished";
import styled from "styled-components";
import { color, layout, space } from "styled-system";
import flex from "../../utils/flex";
import addOnsCss, { defaultAddOns } from "./addOns/addOns";
import { ISpace, ISpaceModifiers } from "./interface";

const SpaceBase = styled.div<ISpace>`
  display: flex;

  ${space};
  ${color};
  ${layout};
`;

const Flex = styled(SpaceBase)<ISpace>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  width: -webkit-fill-available;
`;

const Center = styled(SpaceBase)`
  ${flex.alignCenter}
  width: -webkit-fill-available;

  ${space}
`;

const Between = styled(SpaceBase)`
  ${flex.spaceBetween}

  ${space}
`;

const Horizontal = styled.div<ISpace>`
  padding: 2rem;
  width: -webkit-fill-available;

  ${space};
  ${color};
  ${layout};

  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 5rem;
  }
`;

const MiddleCenter = styled(SpaceBase)`
  ${flex.alignCenterCol}
  height: -webkit-fill-available;
  width: -webkit-fill-available;

  flex-direction: column;
  gap: 1rem;
  ${defaultAddOns};
`;

const SpaceMain = styled(SpaceBase)`
  padding: 2rem;
  padding-top: 5rem;

  width: -webkit-fill-available;
  ${defaultAddOns};
`;

const SpaceDashed = styled(SpaceBase)<ISpaceModifiers>`
  margin: 1rem 0;
  border: 1px dashed ${transparentize(0.6, "var(--contrast)")};

  ${({ addOns }) => addOnsCss(addOns)}
  ${defaultAddOns};
`;

const SpaceModifiers = styled(SpaceBase)<ISpaceModifiers>`
  flex-direction: ${(props) => props.type ?? "row"};

  ${({ addOns }) => addOnsCss(addOns)}
  ${defaultAddOns};
`;

export default {
  Flex,
  Center,
  Between,
  Horizontal,
  MiddleCenter,
  Main: SpaceMain,
  Modifiers: SpaceModifiers,
  Dashed: SpaceDashed,
};
