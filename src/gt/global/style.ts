import { transparentize } from "polished";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { scrolls } from "../../utils";
import transitions from "../../utils/transitions";
import { IGLobalStyle } from "./interface";
// import Kanit from "../../assets/fonts/Kanit-Regular.ttf"

const GlobalStyle = createGlobalStyle`
  ${reset} 

  /* TO DO: improve, so user uses his desired font */

  * {
    color: ${({ theme }: IGLobalStyle) => theme.contrast};
    ${transitions.basic}
  }

  body {
    font-family: 'Kanit', sans-serif;
    background: ${({ theme }: IGLobalStyle) => theme.secondary};

    ${scrolls.default}
  }
`;

export default GlobalStyle;
