/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { transparentize } from "polished";
import styled from "styled-components";
import flex from "../../utils/flex";
import shadows from "../../utils/shadows";
import Switch from "../Switch";
import { ILoginBoxPrimary } from "./interface";

const LoginWrapper = styled.div`
  position: relative;
  height: 100vh;
  ${flex.column}

  ${Switch.Label} {
    margin-top: 2rem;
    margin-left: 2rem;
  }
`;

const LoginBoxContrast = styled.div`
  position: absolute;
  top: 0;
  bottom: 50%;
  background: linear-gradient(
    50deg,
    ${(props) => props.theme.loginBackground1} 0%,
    ${(props) => props.theme.loginBackground2} 50%,
    ${(props) => props.theme.loginBackground3} 100%
  );
  left: 0;
  right: 0;
`;

const LoginBoxPrimary = styled.div<ILoginBoxPrimary>`
  background: ${(props) => props.theme.pageBackground};
  position: absolute;
  top: 50%;
  bottom: 0%;
  left: 0;
  right: 0;

  @media (max-width: 1500px) {
    height: ${(props) => props.height - props.height * 0.3}px;
  }

  /* if is mobile, doesnt care about the height */
  @media (max-width: 1000px) {
    height: auto;
  }
`;

const LoginBoxMain = styled.main`
  position: absolute;
  top: 15%;
  left: 60%;
  width: 30vw;
  background: ${(props) => transparentize(0.4, props.theme.primary)};
  backdrop-filter: blur(1rem);
  border-radius: 0.25rem;
  ${shadows.glow}
  ${flex.alignCenter}
  gap: 2.5rem;

  @media (max-width: 1700px) {
    top: 5%;
  }

  @media (max-width: 1000px) {
    width: 100%;
    min-height: 100vh;
    left: 0;
    right: 0;
    top: 0;
  }

  transform: rotateY(180deg);

  /* add animation based on the mirror */
  animation: mirrorFace 1s forwards;

  @keyframes mirrorFace {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
`;

const LoginBoxWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 3rem;
  ${flex.column}
  ${flex.alignCenter}
  ${flex.wrapGap}
  justify-content: space-evenly;

  /* when it's mobile */
  @media (max-width: 1000px) {
    padding-top: 6rem;
  }
`;

export default {
  Wrapper: LoginWrapper,
  BoxContrast: LoginBoxContrast,
  BoxPrimary: LoginBoxPrimary,
  BoxMain: LoginBoxMain,
  BoxWrapper: LoginBoxWrapper,
};
