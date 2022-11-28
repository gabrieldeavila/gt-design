import styled from "styled-components";
import { color, space } from "styled-system";
import { flex } from "../../utils";

const GTContainer = styled.div`
  ${color}
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.containerSecondary}, 55%, 
    ${(props) => props.theme.containerMain} 
  );

  min-height: 100vh;

  ${space}
`;

export default GTContainer;

export const DEVONLY = styled.div`
  width: 100vw;
  height: 100vh;
  ${flex.alignCenter}
`;
