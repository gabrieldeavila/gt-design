/* eslint-disable operator-linebreak */
import { transparentize } from "polished";
import { memo } from "react";
import styled, { css } from "styled-components";
import { animations, transforms } from "../../utils";
import { defaultAddOns } from "../Space/addOns/addOns";
import TextBtn from "./Extras/Btn";
import Divider from "./Extras/Divider";
import { IText, ITextDividerWrapper } from "./interface";

const P = styled.p<IText>`
  color: ${(props) => props.theme.contrast};
  font-weight: 300;
  text-align: justify;

  ${defaultAddOns};
`;

const h1Css = css`
  font-weight: 500;
  font-size: 1.5rem;

  width: fit-content;

  background-image: linear-gradient(
    300deg,
    ${(props) => props.theme.labelSecondary},
    ${(props) => props.theme.labelPrimary} 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  ${defaultAddOns};
`;

const H1 = styled.h1<IText>`
  ${h1Css}
`;

const H2 = styled.h2<IText>`
  ${h1Css}

  font-weight: 400;
  font-size: 1.2rem;
`;

// a simple btn that is used to call a function or navigate to a page
export const TextBtnStyled = styled.button`
  background: none;
  border: none;
  margin: 0;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.textBtn};
  border-radius: 0.25rem;
  position: relative;
  font-size: 0.7rem;

  &::after {
    content: "";
    border-radius: 0.25rem;
    position: absolute;
    top: 1rem;
    height: 2px;
    background: ${(props) => props.theme.textBtn};
    ${({ isFirstRender }: { isFirstRender: boolean }) =>
      !isFirstRender && "animation: underlineFill 0.5s ease-in-out forwards;"}
  }

  /* adiciona animação no after */
  &:hover::after {
    animation: underline 0.5s ease-in-out forwards;
  }

  &:active {
    ${transforms.press}
  }

  ${animations.underline}
  ${defaultAddOns};
`;

const Strong = styled.strong`
  color: ${(props) => props.theme.contrast};
  font-weight: 500;

  ${defaultAddOns};
`;

export const DividerStyled = styled.div``;

export const DividerWrapper = styled.div<ITextDividerWrapper>`
  display: flex;
  border-block-start: 0 rgba(253, 253, 253, 0.12);
  align-items: center;
  margin-bottom: 1rem;

  &:after,
  &:before {
    content: "";
    position: relative;
    border-block-start-style: dashed;
    border-block-start: 1px solid transparent;
    border-block-start-color: ${(props) =>
      transparentize(0.9, props.theme.contrast)};
    border-block-end: 0;
    transform: translateY(50%);
    height: 1px;
  }

  &:after {
    width: ${(props) => props.currWidth.after};
  }

  &:before {
    width: ${(props) => props.currWidth.before};
  }

  ${defaultAddOns};
`;

export const DividerText = styled(H2)`
  padding: 0 0.5rem;
  white-space: pre;

  ${defaultAddOns};
`;

const Text = { P, H1, H2, Btn: memo(TextBtn), Strong, Divider: memo(Divider) };

export default Text;
