import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { scrolls } from "../../utils";

const GlobalStyle = createGlobalStyle`
  ${reset} 

  * {
    color: var(--contrast);
    line-height: 1.5 !important;
  }
  
  input:-webkit-autofill { 
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: white !important;
  }

  body {
    background-color: var(--secondary);

    ${scrolls.default};
  }

  ::selection {
    background: var(--contrast);
    color: var(--primary);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyle;
