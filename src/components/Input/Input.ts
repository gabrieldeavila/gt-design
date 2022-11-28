/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled, { css } from "styled-components";
import animations from "../../utils/animations";
import flex from "../../utils/flex";
import { IInputContainer, IInputField } from "./interface";

const InputWrapper = styled.div`
  ${flex.wrapGap}
  gap: 1.75rem;
`;

const InputContainer = styled.div<IInputContainer>`
  ${flex.column}
  gap: 0.5rem;
  width: -webkit-fill-available;
  position: relative;

  svg {
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

const SelectOptions = styled.div`
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

const SelectValue = styled.div``;

const Select = {
  Options: SelectOptions,
  Value: SelectValue,
};

export { Select };
