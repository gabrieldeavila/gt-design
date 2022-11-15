import styled from "styled-components";
import { color } from "styled-system";

const GTContainer = styled.div`
  ${color}
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.containerSecondary}, 55%, 
    ${(props) => props.theme.containerMain} 
  );

  min-height: 100vh;
`;

export default GTContainer;
