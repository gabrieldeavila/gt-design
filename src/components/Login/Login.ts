/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { scrolls } from "../../utils";
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

  /* if is mobile, doesnt care about the height */
  @media (max-width: 1000px) {
    height: auto;
  }
`;

const mirrorCss = css`
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

const mirrorWhenFirstRender = css`
  transform: rotateY(0deg);
`;

const LoginBoxMain = styled.main`
  position: absolute;
  height: 75%;
  top: 5%;
  left: 60%;
  padding: 1.5rem;
  width: 30vw;
  background: ${(props) => transparentize(0.4, props.theme.primary)};
  backdrop-filter: blur(1rem);
  border-radius: 0.25rem;
  ${flex.alignCenter}

  @media (max-width: 1000px) {
    width: calc(100% - 3rem);
    height: fit-content;
    min-height: calc(100vh - 3rem);
    left: 0;
    right: 0;
    top: 0;
  }

  &:hover {
    ${shadows.glow}
  }

  transform: rotateY(180deg);

  ${({ isFirstRender }: { isFirstRender?: boolean }) =>
    isFirstRender ?? false ? mirrorWhenFirstRender : mirrorCss}
`;

const LoginBoxWrapper = styled.div`
  width: 100%;
  justify-content: space-evenly;
  flex-direction: row;
  height: -webkit-fill-available;
  padding: 0.5rem;

  ${flex.column}
  ${flex.alignCenter}
  ${flex.wrapGap}

  gap: 2rem;
  flex-direction: row;
  overflow: auto;
  /* when it's mobile */
  @media (max-width: 1000px) {
    padding-bottom: 3rem;
  }

  ${scrolls.default}
`;

export default {
  Wrapper: LoginWrapper,
  BoxContrast: LoginBoxContrast,
  BoxPrimary: LoginBoxPrimary,
  BoxMain: LoginBoxMain,
  BoxWrapper: LoginBoxWrapper,
};
