import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import flex from "../../utils/flex";
import { ISpaceHorizontal } from "./interface";

const customHeight = css`
  height: ${(props: { height?: string }) => props.height};
`;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  width: -webkit-fill-available;
  ${space}

  ${customHeight};
`;

const FlexCenter = styled(Flex)`
  ${flex.alignCenter}

  ${space}
`;

const FlexCenterRow = styled(Flex)`
  ${flex.alignCenterCol}
  ${space}
`;

const FullSpace = styled.div<SpaceProps>`
  width: -webkit-fill-available;
  height: fit-content;

  > * {
    width: 100%;
    height: -webkit-fill-available;
  }

  ${customHeight};
  ${space}
`;

const Center = styled.div`
  ${flex.alignCenter}

  ${customHeight};
  ${space}
`;

const Between = styled.div`
  ${flex.spaceBetween}

  ${customHeight};
  ${space}
`;

const Horizontal = styled.div<ISpaceHorizontal>`
  padding: 2rem;
`;

const MiddleCenter = styled.div`
  ${flex.alignCenterCol}
  height: -webkit-fill-available;

  flex-direction: column;
  gap: 1rem;
`;

const SpaceMain = styled.main`
  padding: 2rem;
  padding-top: 5rem;
`;

export default {
  Flex,
  FlexCenter,
  FlexCenterRow,
  FullSpace,
  Center,
  Between,
  Horizontal,
  MiddleCenter,
  Main: SpaceMain,
};
