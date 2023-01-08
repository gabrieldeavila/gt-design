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
import ButtonError from "./Extras/Error";
import ButtonSuccess from "./Extras/Success";
import { IButton } from "./interface";

const ResetBtn = styled.button<IButton>`
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
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
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
`;

const ButtonWrapper = styled.div`
  ${flex.wrapGap};
  ${flexbox}
`;

const ButtonNormal = styled(ResetBtn)`
  background: ${(props) => transparentize(0.5, props.theme.primary)};
  color: ${(props) => props.theme.contrast};
`;

const ButtonContrast = styled(ResetBtn)`
  background: ${(props) => transparentize(0.1, props.theme.contrast)};
  color: ${(props) => props.theme.primary};
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

  & .extra-title {
    position: relative;
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

const ButtonTransparent = styled(ResetBtn)``;

export default {
  Wrapper: ButtonWrapper,
  Normal: ButtonNormal,
  Contrast: ButtonContrast,
  Transparent: ButtonTransparent,
  Success: ButtonSuccess,
  Error: ButtonError,
};
