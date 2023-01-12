import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { color, space } from "styled-system";
import flex from "../../utils/flex";
import addOnsCss from "./addOns/addOns";
import { ISpace, ISpaceModifiers } from "./interface";

const customHeight = css`
  height: ${(props: { height?: string }) => props.height};
`;

const SpaceBase = styled.div<ISpace>`
  display: flex;

  ${space}
  ${color}
  ${customHeight};
`;

const Flex = styled(SpaceBase)<ISpace>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  width: -webkit-fill-available;

  ${customHeight};
`;

const FlexCenter = styled(Flex)`
  ${flex.alignCenter}

  ${space}
`;

const FullSpace = styled.div<ISpace>`
  width: -webkit-fill-available;
  height: fit-content;

  > * {
    width: 100%;
    height: -webkit-fill-available;
  }

  ${customHeight};
  ${space}
  ${color}
`;

const Center = styled(SpaceBase)`
  ${flex.alignCenter}

  ${customHeight};
  ${space}
`;

const Between = styled(SpaceBase)`
  ${flex.spaceBetween}

  ${customHeight};
  ${space}
`;

const Horizontal = styled.div`
  padding: 2rem;
`;

const MiddleCenter = styled(SpaceBase)`
  ${flex.alignCenterCol}
  height: -webkit-fill-available;

  flex-direction: column;
  gap: 1rem;
`;

const SpaceMain = styled(SpaceBase)`
  padding: 2rem;
  padding-top: 5rem;
`;

const SpaceDashed = styled(SpaceBase)<ISpaceModifiers>`
  margin: 1rem 0;
  border: 1px dashed ${(props) => transparentize(0.6, props.theme.contrast)};

  ${({ addOns, type }) => addOnsCss(addOns, type)}
`;

const SpaceModifiers = styled(SpaceBase)<ISpaceModifiers>`
  flex-direction: ${(props) => props.type ?? "row"};

  ${({ addOns, type }) => addOnsCss(addOns, type)}
`;

export default {
  Flex,
  FlexCenter,
  FullSpace,
  Center,
  Between,
  Horizontal,
  MiddleCenter,
  Main: SpaceMain,
  Modifiers: SpaceModifiers,
  Dashed: SpaceDashed,
};
