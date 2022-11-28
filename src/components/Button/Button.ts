/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import styled, { css } from "styled-components";
import { flexbox, space } from "styled-system";
import { transforms } from "../../utils";
import flex from "../../utils/flex";
import hovers from "../../utils/hovers";
import shadows from "../../utils/shadows";
import transitions from "../../utils/transitions";
import { IButton } from "./interface";

const resetBtn = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  font-family: "Kanit", sans-serif;
  width: fit-content;
  padding: 1rem;
  border-radius: 0.25rem;
  width: -webkit-fill-available;

  /* if it's disabled */
  ${({ disabled }: { disabled: boolean }) =>
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
`;

const ButtonWrapper = styled.div`
  ${flex.wrapGap};
  ${flexbox}
`;

const btnOptions = css<IButton>`
  ${({ fitContent }) => (fitContent ?? false) && "width: fit-content"}
`;

const ButtonNormal = styled.button`
  ${resetBtn};
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.contrast};
  ${shadows.simple}
  ${btnOptions}
`;

const ButtonNormalShadow = styled(ButtonNormal)`
  ${shadows.basic}
`;

const ButtonContrast = styled.button`
  ${resetBtn};
  ${shadows.simple}
  background: ${(props) => props.theme.contrast};
  color: ${(props) => props.theme.primary};

  ${btnOptions}
  ${space};
`;

export default {
  Wrapper: ButtonWrapper,
  Normal: ButtonNormal,
  NormalShadow: ButtonNormalShadow,
  Contrast: ButtonContrast,
};
