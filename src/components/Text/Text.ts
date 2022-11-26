/* eslint-disable operator-linebreak */
import styled, { css } from "styled-components";
import { space, fontSize } from "styled-system";
import { transitions } from "../../utils";

const P = styled.p`
  color: ${(props) => props.theme.contrast};
  font-weight: 300;

  text-align: justify;
  ${({ sm }: { sm?: boolean }) =>
    sm &&
    css`
      font-size: 0.75rem;
      font-weight: 100;
    `}

  ${space}
  ${fontSize}
`;

const h1Css = css`
  font-weight: 500;
  font-size: 1.5rem;
  ${space}
  ${fontSize}
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.contrast};
  ${h1Css}
`;

const H1Contrast = styled.h1`
  color: ${(props) => props.theme.primary};
  ${h1Css}
`;

// a simple btn that is used to call a function or navigate to a page
const Btn = styled.button`
  background: none;
  border: none;
  margin: 0;
  cursor: pointer;
  user-select: none;
  font-family: "Kanit", sans-serif;
  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.textBtn};
  border-radius: 0.25rem;
  position: relative;
  font-size: 0.7rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 99%;
    top: 1rem;
    height: 2px;
    visibility: hidden;
    background: ${(props) => props.theme.textBtn};
    ${transitions.basic}
  }

  /* adiciona animação no after */
  &:hover {
    &::after {
      visibility: visible;
      right: 0px;
    }
  }
`;

const Text = { P, H1, H1Contrast, Btn };

export default Text;
