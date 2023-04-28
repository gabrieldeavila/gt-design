/* eslint-disable operator-linebreak */
import styled, { css } from "styled-components";
import { fontWeight, textAlign } from "styled-system";
import { animations, transforms, transitions } from "../../utils";
import { defaultAddOns } from "../Space/addOns/addOns";
import { IText, ITextDividerWrapper } from "./interface";

export const P = styled.p<IText>`
  color: var(--contrast);
  font-weight: 300;
  text-align: justify;

  ${textAlign}
  ${defaultAddOns};
  ${fontWeight}
`;

const h1Css = css`
  font-weight: 500;
  font-size: 1.5rem;

  width: fit-content;

  background-image: linear-gradient(
    300deg,
    var(--labelSecondary),
    var(--labelPrimary) 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const H1 = styled.h1<IText>`
  ${h1Css}
  ${defaultAddOns};
  ${textAlign};
  ${fontWeight}
`;

export const H2 = styled.h2<IText>`
  font-weight: 400;
  font-size: 1.2rem;

  ${textAlign}
  ${h1Css}
  ${defaultAddOns};
  ${fontWeight}
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
  color: var(--textBtn);
  border-radius: 0.25rem;
  position: relative;
  font-size: 0.7rem;

  &::after {
    content: "";
    border-radius: 0.25rem;
    position: absolute;
    top: 1rem;
    height: 2px;
    background-color: var(--textBtn);
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

export const Strong = styled.strong`
  color: var(--contrast);
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
    border-block-start-color: var(--contrast-0_9);
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

  ${textAlign}
  ${defaultAddOns};
`;

export const DividerText = styled(H2)`
  padding: 0 0.5rem;
  white-space: pre;

  ${defaultAddOns};
`;

export const TextAction = styled.button<IText>`
  background: none;
  border: none;
  margin: 0;
  cursor: pointer;
  user-select: none;
  color: var(--contrast);

  &:hover {
    color: var(--contrast-0_5);
  }

  &:active {
    ${transforms.press}
  }

  ${defaultAddOns};
  ${textAlign};
  ${fontWeight};
  ${transitions.linear}
`;

export const TextTitle = styled.h1<IText>`
  background-image: linear-gradient(
    180deg,
    var(--primary-0_1),
    var(--contrast) 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;

  ${defaultAddOns};

  /* when it's mobile */
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const TextSubtitle = styled.h2`
  color: var(--contrast);
  font-weight: 400;
  font-size: 1.2rem;
  text-align: center;

  /* when it's a mobile */
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
