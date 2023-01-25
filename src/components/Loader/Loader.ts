import { memo } from "react";
import styled from "styled-components";
import LoaderSimple from "./Extras/Simple";

export const LoaderWrapper = styled.div`
  display: flex;

  & svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = {
  Simple: memo(LoaderSimple),
};

export default Loader;
