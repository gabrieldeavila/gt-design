/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { fontSize, space } from "styled-system";
import { animations, transforms } from "../../utils";
import { ITextBtn, IText } from "./interface";

const P = styled.p<IText>`
  color: ${(props) => props.theme.contrast};
  font-weight: 300;
  text-align: justify;

  ${space}
  ${fontSize}
`;

const h1Css = css`
  font-weight: 500;
  font-size: 1.5rem;
  ${space}
  ${fontSize}
  width: fit-content;

  background-image: linear-gradient(
    300deg,
    ${(props) => props.theme.labelSecondary},
    ${(props) => props.theme.labelPrimary} 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const H1 = styled.h1<IText>`
  ${h1Css}
`;

const H1Contrast = styled.h1<IText>`
  color: ${(props) => props.theme.primary};
  ${h1Css}
`;

// a simple btn that is used to call a function or navigate to a page
const BtnStyled = styled.button`
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
`;

const Strong = styled.strong`
  color: ${(props) => props.theme.contrast};
  font-weight: 500;
`;

function BtnProps({
  children,
  onClick,
  className,
  style,
  disabled,
  type,
}: ITextBtn) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  // avoid animation on first render
  const handleRender = useCallback(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <BtnStyled
      type={type}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      isFirstRender={isFirstRender}
      onMouseEnter={handleRender}
    >
      {children}
    </BtnStyled>
  );
}

const Btn = memo(BtnProps);

const Text = { P, H1, H1Contrast, Btn, Strong };

export default Text;

BtnProps.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

BtnProps.defaultProps = {
  onClick: () => {},
  className: "",
  style: {},
  disabled: false,
  type: "button",
};
