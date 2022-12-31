import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { scrolls } from "../../utils";
import transitions from "../../utils/transitions";
import { IGLobalStyle } from "./interface";

const GlobalStyle = createGlobalStyle`
  ${reset} 

  * {
    color: ${({ theme }: IGLobalStyle) => theme.contrast};
    ${transitions.basic}
  }
  
  body {
    background: ${({ theme }: IGLobalStyle) => theme.secondary};

    ${scrolls.default}
  }

  body, input, button {
    font-family: 'Kanit', sans-serif;
  }

  ::selection {
    background: ${({ theme }: IGLobalStyle) => theme.contrast};
    color: ${({ theme }: IGLobalStyle) => theme.primary};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyle;
