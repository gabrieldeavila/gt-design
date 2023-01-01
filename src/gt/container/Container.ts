import styled from "styled-components";
import { color, space } from "styled-system";

const Default = styled.div`
  ${color}
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.containerSecondary}, 55%, 
    ${(props) => props.theme.containerMain} 
  );

  min-height: 100vh;

  ${space}
`;

const GTContainer = {
  Default,
};

export default GTContainer;
