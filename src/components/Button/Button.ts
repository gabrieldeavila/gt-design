/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { flexbox, space } from "styled-system";
import { transforms } from "../../utils";
import flex from "../../utils/flex";
import hovers from "../../utils/hovers";
import shadows from "../../utils/shadows";
import transitions from "../../utils/transitions";
import { LoaderWrapper } from "../Loader/Loader";
import ButtonContrast from "./Extras/Contrast";
import ButtonError from "./Extras/Error";
import ButtonNormal from "./Extras/Normal";
import ButtonSuccess from "./Extras/Success";
import ButtonTransparent from "./Extras/Transparent";
import { IButton } from "./interface";

export const ResetBtn = styled.button<IButton>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  padding: 0.75rem;
  border-radius: 0.25rem;
  width: -webkit-fill-available;

  /* if it's disabled */
  ${({ disabled, isLoading }) =>
    disabled &&
    !isLoading &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: progress;
      opacity: 0.5;
    `}

  ${transitions.linear}

  /* only has hover if it's not disabled */
  ${({ disabled }) => !disabled && hovers.scaleTransYOpacity}

  &:active {
    ${({ disabled }) => !disabled && transforms.press}
  }

  ${shadows.simple};
  ${space};

  & .extra-title {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  & .extra-title-children,
  ${LoaderWrapper} {
    display: flex;
  }
`;

const ButtonWrapper = styled.div`
  ${flex.wrapGap};
  ${flexbox}
`;

export const ExtraNormal = styled(ResetBtn)`
  background: ${(props) => transparentize(0.5, props.theme.primary)};

  & .extra-title-children {
    color: ${(props) => props.theme.contrast};
  }
`;

export const ExtraContrast = styled(ResetBtn)`
  background: ${(props) => transparentize(0.1, props.theme.contrast)};

  & .extra-title-children {
    color: ${(props) => props.theme.primary};
  }

  & .extra-title svg {
    stroke: ${(props) => props.theme.primary};
  }
`;

export const ExtraSuccess = styled(ResetBtn)`
  width: -webkit-fill-available;
  position: relative;
  box-sizing: border-box;

  border-radius: 0.25rem;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    border-radius: inherit; /* !importanté */
    background: linear-gradient(
      40deg,
      ${(props) => props.theme.buttonSuccess1} 0%,
      ${(props) => props.theme.buttonSuccess2} 55%
    );
    background-size: 1px 400px;
    background-position: 0px;
    transition: 0.5s ease;
  }

  &:active:before {
    background-size: 1px 800px;
  }
`;

export const ExtraError = styled(ExtraSuccess)`
  &:before {
    background: linear-gradient(
      40deg,
      ${(props) => props.theme.buttonError1} 0%,
      ${(props) => props.theme.buttonError2} 55%
    );
    background-size: 1px 400px;
    background-position: 0px;
  }
`;

const Button = {
  Wrapper: ButtonWrapper,
  Normal: ButtonNormal,
  Contrast: ButtonContrast,
  Transparent: ButtonTransparent,
  Success: ButtonSuccess,
  Error: ButtonError,
};

export default Button;
