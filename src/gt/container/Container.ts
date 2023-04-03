import styled from "styled-components";
import { color, space } from "styled-system";

const Default = styled.div`
  ${color}
  background: linear-gradient(
    180deg,
    var(--containerSecondary), 55%, 
    var(--containerMain) 
  );

  min-height: 100vh;

  ${space}
`;

const GTContainer = {
  Default,
};

export default GTContainer;
