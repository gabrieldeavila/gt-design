/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import styled, { css } from "styled-components";
import { flexbox, space } from "styled-system";
import { transforms } from "../../utils";
import flex from "../../utils/flex";
import hovers from "../../utils/hovers";
import shadows from "../../utils/shadows";
import transitions from "../../utils/transitions";
import { LoaderWrapper } from "../Loader/Loader";
import { defaultAddOns } from "../Space/addOns/addOns";
import { IButton } from "./interface";

const sm = css`
  padding: 0.45rem;
`;

const md = css`
  padding: 0.75rem;
`;

const lg = css`
  padding: 1rem;
`;

type sizes = {
  [key in "sm" | "md" | "lg"]: any;
};

const sizesOpts: sizes = {
  sm,
  md,
  lg,
};

export const ResetBtn = styled.button<IButton>`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  height: fit-content;
  padding: 0.75rem;
  border-radius: 0.25rem;
  width: ${({ fitContent }) =>
    fitContent ? "fit-content" : "-webkit-fill-available;"};

  white-space: ${({ fitContent }) => (fitContent ? "pre;" : "unset;")};

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
    align-items: center;
    gap: 1rem;
  }

  & .extra-title-children,
  ${LoaderWrapper} {
    display: flex;
  }

  ${({ defaultSize }) => {
    const val = defaultSize ?? "md";

    return sizesOpts[val];
  }}

  ${defaultAddOns}
`;

export const ButtonWrapper = styled.div`
  ${flex.wrapGap};
  ${flexbox}
`;

export const ExtraNormal = styled(ResetBtn)`
  background: var(--primary-0_5);

  & .extra-title-children {
    color: var(--contrast);
  }
`;

export const ExtraContrast = styled(ResetBtn)`
  background: var(--contrast-0_1);

  & .extra-title-children {
    color: var(--primary);
  }

  & .extra-title svg {
    stroke: var(--primary);
  }
`;

export const ExtraSuccess = styled(ResetBtn)`
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
      var(--buttonSuccess1) 0%,
      var(--buttonSuccess2) 55%
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
      var(--buttonError1) 0%,
      var(--buttonError2) 55%
    );
    background-size: 1px 400px;
    background-position: 0px;
  }
`;

/* export const ExtraInitial = styled(ResetBtn)<BackgroundColorProps>` */
/* TODO: why props are not being applied? */

export const ExtraInitial = styled(ResetBtn)`
  background-color: ${({
    bg,
    background,
  }: {
    bg?: string;
    background?: string;
  }) => bg ?? background};
`;
