import { transparentize } from "polished";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
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

    /* width */
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: ${({ theme }: IGLobalStyle) => theme.secondary};
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }: IGLobalStyle) => theme.contrast};
      border-radius: 0.25rem;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }: IGLobalStyle) =>
        transparentize(0.5, theme.contrast)};
    } 
    }
`;

export default GlobalStyle;
