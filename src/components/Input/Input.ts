/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { hovers, scrolls, shadows } from "../../utils";
import animations from "../../utils/animations";
import flex from "../../utils/flex";
import {
  IIconWrapper,
  IInputContainer,
  IInputField,
  ISelectValue,
} from "./interface";

const InputWrapper = styled.div`
  ${flex.wrapGap}
  gap: 1.75rem;
`;
const getRowWidth = ({ row }: IInputContainer) => {
  let cssSrc = "";

  if (row == null) cssSrc = "-webkit-fill-available";
  else cssSrc = `${row * 5}rem`;

  return css`
    width: ${cssSrc};
  `;
};

const loadingInput = css`
  background: ${({ theme }) => theme.primary};
  overflow: hidden;
  min-height: 3.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-80%);
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => transparentize(1, theme.secondary)} 0,
      ${({ theme }) => transparentize(0.2, theme.secondary)} 20%,
      ${({ theme }) => transparentize(0.8, theme.secondary)} 60%,
      ${({ theme }) => transparentize(1, theme.secondary)}
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const iconCenter = css`
  top: 1.25rem;
  right: 0.5rem;
`;

const topRight = css`
  right: 2.5rem;
  top: 1.3rem;
`;

const types = {
  center: iconCenter,
  top_right: topRight,
};

const IconWrapper = styled.div<IIconWrapper>`
  position: absolute;
  opacity: 0;
  ${({ type }) => types[type]};
`;

const InputContainer = styled.div<IInputContainer>`
  ${getRowWidth}
  flex-grow: 1;

  ${flex.column}
  gap: 0.5rem;
  position: relative;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 0.25rem;

  &:focus-within {
    outline: 2px solid ${(props) => props.theme.outline};
    outline-offset: 0.15rem;
  }

  border-radius: 0.25rem;
  box-shadow: 0 0 0 0.15rem ${(props) => transparentize(1, props.theme.outline)};

  &:focus-within {
    box-shadow: 0 0 0 0.25rem
      ${(props) => transparentize(0.5, props.theme.outline)};
  }

  &:hover ${IconWrapper} {
    opacity: 1;
  }

  svg:not(.svg-no-active) {
    user-select: none;
    cursor: pointer;
    top: 30%;
    right: 0.5rem;
    stroke: ${(props) => props.theme.contrast};
    position: absolute;

    &:active {
      transform: scale(0.65);
    }

    ${({ isUp }) => css`
      transform: ${isUp ?? false
        ? "scale(0.75) rotate(180deg)"
        : "scale(0.75) rotate(0deg)"};
    `}
  }

  ${({ isLoading }) => (isLoading ?? false) && loadingInput}
`;

const InputGroup = styled.form`
  ${flex.wrapGap}
  gap: 1.75rem;
  flex-direction: row;
`;

const InputField = styled.input<IInputField>`
  width: -webkit-fill-available;
  height: 2.5rem;
  outline: none;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  padding-top: 1rem;
  padding-right: 2.5rem;
  border: none;
  background: ${(props) => transparentize(0.2, props.theme.primary)};
  color: ${(props) => props.theme.contrast};

  /* changes the placeholder color */
  &::placeholder {
    color: ${(props) => props.theme.contrast};
  }
`;

const InputLabel = styled.label`
  user-select: none;
  cursor: text;
  position: absolute;
  left: 0.5rem;
  /* creates color with gradient */
  background: -webkit-linear-gradient(
    300deg,
    ${(props) => props.theme.labelSecondary},
    ${(props) => props.theme.labelPrimary} 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  box-decoration-break: clone;

  ${animations.upLabel}
`;

const InputError = styled.span`
  user-select: none;
  cursor: text;
  position: absolute;
  font-size: 0.65rem;
  color: ${(props) => props.theme.errorColor};
  top: 100%;
  margin-top: 0.35rem;
  padding: 0 0.5rem;
`;

const Input = {
  Wrapper: InputWrapper,
  Group: InputGroup,
  Container: InputContainer,
  Field: InputField,
  Label: InputLabel,
  Error: InputError,
  IconWrapper,
};

export default Input;

const SelectOptionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.25rem;
  ${shadows.basic}
`;

const SelectOptionsContainer = styled.div`
  max-height: 10rem;
  overflow: auto;
  padding-right: 0.5rem;
  ${scrolls.default}
  ${flex.wrapGap}
  gap: 0.5rem;
`;

const SelectValue = styled.div<ISelectValue>`
  width: -webkit-fill-available;
  max-width: 100%;
  font-size: 0.75rem;
  padding: 1rem;
  background: ${(props) => props.theme.secondary};
  text-align: justify;
  word-break: break-word;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  border-radius: 0.25rem;

  ${hovers.scaleTransYOpacity}

  &:active {
    transform: scale(0.98);
  }

  ${({ isSelected, isPreSelected, theme }) => css`
    background: ${isSelected
      ? theme.secondary
      : isPreSelected
      ? theme.preSelectColor
      : transparentize(0.7, theme.secondary)};
  `}
`;

const SelectNotFound = styled.div`
  width: -webkit-fill-available;
  max-width: 100%;
  font-size: 0.75rem;
  padding: 1rem 0;
  text-align: justify;
  text-overflow: hidden;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  border-radius: 0.25rem;
`;

const Select = {
  OptionsWrapper: SelectOptionsWrapper,
  OptionsContainer: SelectOptionsContainer,
  Value: SelectValue,
  NotFound: SelectNotFound,
};

export { Select };
