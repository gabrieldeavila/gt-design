import styled from "styled-components";
import { color, flexDirection, layout, space } from "styled-system";
import flex from "../../utils/flex";
import addOnsCss, { defaultAddOns } from "./addOns/addOns";
import { ISpace, ISpaceModifiers, ISpaceStyle } from "./interface";

const SpaceBase = styled.div<ISpace>`
  display: flex;

  ${flexDirection};
  ${space};
  ${color};
  ${layout};
  ${defaultAddOns};
`;

const Flex = styled(SpaceBase)<ISpace>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  width: -webkit-fill-available;
  width: -moz-available;
`;

const Center = styled(SpaceBase)`
  ${flex.alignCenter}
  width: -webkit-fill-available;
  width: -moz-available;

  ${defaultAddOns};
`;

const Between = styled(SpaceBase)`
  ${flex.spaceBetween}

  ${space}
`;

const Horizontal = styled.div<ISpace>`
  padding: 2rem;
  width: -webkit-fill-available;
  width: -moz-available;

  ${space};
  ${color};
  ${layout};

  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 5rem;
  }
`;

const Content = styled.div<ISpace>`
  max-width: 1248px;

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
  width: -moz-available;

  ${defaultAddOns};
`;

const SpaceDashed = styled(SpaceBase)<ISpaceModifiers>`
  margin: 1rem 0;
  border: 1px dashed var(--contrast-0_5);

  ${({ addOns }) => addOnsCss(addOns)}
  ${defaultAddOns};
`;

const SpaceModifiers = styled(SpaceBase)<ISpaceModifiers>`
  flex-direction: ${(props) => props.type ?? "row"};

  ${({ addOns }) => addOnsCss(addOns)}
  ${defaultAddOns};
`;

const Space: ISpaceStyle = {
  Flex,
  Center,
  Between,
  Content,
  Horizontal,
  MiddleCenter,
  Main: SpaceMain,
  Modifiers: SpaceModifiers,
  Dashed: SpaceDashed,
};

export default Space;
