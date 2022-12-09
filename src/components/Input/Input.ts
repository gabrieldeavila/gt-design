/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { hovers, scrolls } from "../../utils";
import animations from "../../utils/animations";
import flex from "../../utils/flex";
import { IInputContainer, IInputField, ISelectValue } from "./interface";

const InputWrapper = styled.div`
  ${flex.wrapGap}
  gap: 1.75rem;
`;

const InputContainer = styled.div<IInputContainer>`
  ${flex.column}
  gap: 0.5rem;
  width: -webkit-fill-available;
  position: relative;

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
`;

const InputGroup = styled.div`
  ${flex.wrapGap}
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
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.contrast};
  font-family: "Kanit", sans-serif;
`;

const InputLabel = styled.label`
  user-select: none;
  cursor: text;
  position: absolute;
  font-size: 0.75rem;
  left: 0.5rem;
  color: ${(props) => props.theme.contrast};

  ${animations.upLabel}
`;

const InputError = styled.span`
  user-select: none;
  cursor: text;
  position: absolute;
  font-size: 0.65rem;
  color: ${(props) => props.theme.errorColor};
  top: 100%;
  margin-top: 0.25rem;
`;

const Input = {
  Wrapper: InputWrapper,
  Group: InputGroup,
  Container: InputContainer,
  Field: InputField,
  Label: InputLabel,
  Error: InputError,
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
    transform: scale(0.9);
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
