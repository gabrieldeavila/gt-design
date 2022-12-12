import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import flex from "../../utils/flex";

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

const Horizontal = styled.div`
  padding: 2rem;
`;

export default {
  Flex,
  FlexCenter,
  FlexCenterRow,
  FullSpace,
  Center,
  Between,
  Horizontal,
};
