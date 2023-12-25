import styled, { css } from "styled-components";
import { shadows } from "../../../../utils";

const styleOptionWrapper = css`
  opacity: 1;
`;

const OptionWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  opacity: 0;

  ${({ show }) => show && styleOptionWrapper}
`;

const OptionContainer = styled.div`
  padding: 0.5rem;
  background-color: var(--primary-0_2);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  ${shadows.simple}
`;

const OptionItemsWrapper = styled.div``;

const OptionItemsContainer = styled.div``;

const OptionItemValue = styled.p`
  padding: 0.5rem;
  border-radius: 5px;
  &:hover {
    background-color: var(--primary-0_1);
  }
`;

const OptionsSt = {
  Wrappper: OptionWrapper,
  Container: OptionContainer,
  Item: {
    Wrapper: OptionItemsWrapper,
    Container: OptionItemsContainer,
    Value: OptionItemValue,
  },
};

export default OptionsSt;
