/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from "styled-components";
import animations from "../../utils/animations";
import flex from "../../utils/flex";

const InputWrapper = styled.div`
  ${flex.wrapGap}
  gap: 1.75rem;
`;

const InputContainer = styled.div`
  ${flex.column}
  gap: 0.5rem;
  width: 100%;
  position: relative;

  svg {
    user-select: none;
    cursor: pointer;
    top: 30%;
    transform: scale(0.75);
    right: 0.5rem;
    stroke: ${(props) => props.theme.contrast};
    position: absolute;
  }
`;

const InputField = styled.input`
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
  Container: InputContainer,
  Field: InputField,
  Label: InputLabel,
  Error: InputError,
};

export default Input;
