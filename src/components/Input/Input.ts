/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { hovers, scrolls, shadows, transitions } from "../../utils";
import flex from "../../utils/flex";
import skeletons from "../../utils/skeletons";
import {
  IIconWrapper,
  IInputContainer,
  IInputField,
  IInputLabel,
  ISelectOptionWrapper,
  ISelectValue,
} from "./interface";

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
  cursor: wait;

  ${skeletons.after}
`;

const InputIconWrapper = styled.div<IIconWrapper>`
  display: flex;
  opacity: ${({ showOpacity }) => (showOpacity ?? false ? 1 : 0)};
`;

const InputContainer = styled.div<IInputContainer>`
  ${getRowWidth}
  display: flex;

  flex-grow: 1;
  position: relative;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 0.25rem;
  background: ${(props) => transparentize(0.2, props.theme.primary)};

  &:focus-within {
    outline: 2px solid
      ${({ theme, isWrong }) =>
        isWrong ?? false ? theme.outlineError : theme.outline};
    outline-offset: 0.15rem;
    box-shadow: 0 0 0 0.25rem
      ${({ theme, isWrong }) =>
        transparentize(
          0.5,
          isWrong ?? false ? theme.outlineError : theme.outline
        )};
  }

  border-radius: 0.25rem;
  box-shadow: 0 0 0 0.15rem ${(props) => transparentize(1, props.theme.outline)};

  &:hover ${InputIconWrapper} {
    opacity: 1;
  }

  svg:not(.svg-no-active) {
    user-select: none;
    cursor: pointer;

    &:active {
      transform: scale(0.65);
    }

    ${({ isUp }) => css`
      transform: ${isUp ?? false
        ? "scale(0.75) rotate(180deg)"
        : "scale(0.75) rotate(0deg)"};
    `}
  }

  svg.cursor {
    cursor: pointer;
  }

  ${shadows.simple};

  ${({ isLoading }) => (isLoading ?? false) && loadingInput}
`;

const InputNormalizedContainer = styled.label<IInputContainer>`
  ${getRowWidth}
  position: relative;
  display: flex;
  flex-grow: 1;
  gap: 0.5rem;
  align-items: center;
  justify-content: ${({ flexJustify }) => flexJustify ?? "flex-start"};
`;

const InputGroup = styled.form`
  width: -webkit-fill-available;

  ${flex.wrapGap};
  gap: 1.75rem;
  flex-direction: row;
`;

const InputField = styled.input<IInputField>`
  width: 100%;
  height: 2.5rem;
  outline: none;
  border-radius: 0.25rem;
  padding-top: 1rem;
  border: none;
  color: ${(props) => props.theme.contrast};
  background-color: transparent;

  /* changes the placeholder color */
  &::placeholder {
    color: ${(props) => props.theme.contrast};
  }
`;

const wrongCss = css<IInputLabel>`
  background: -webkit-linear-gradient(
    300deg,
    ${({ theme }) => theme.labelSecondary},
    ${({ theme, isWrong }) => (isWrong ? theme.errorColor : theme.labelPrimary)}
      90%
  );
`;

const correctCss = css`
  background: -webkit-linear-gradient(
    300deg,
    ${({ theme }) => theme.labelSecondary},
    ${({ theme }) => theme.labelPrimary} 70%
  );
`;

const handleLabelFirstRender = (up: boolean) => {
  if (up) {
    return css`
      top: 16%;
      font-size: 0.75rem;
    `;
  }

  return css`
    top: 34%;
    font-size: 0.85rem;
  `;
};

const InputLabel = styled.label<IInputLabel>`
  user-select: none;
  cursor: text;
  position: absolute;
  left: 0.5rem;
  /* creates color with gradient */
  background: -webkit-linear-gradient(
    300deg,
    ${({ theme }) => theme.labelSecondary},
    ${({ theme }) => theme.labelPrimary} 70%
  );

  ${({ isWrong }) => (isWrong ? wrongCss : correctCss)}
  ${({ up }) => handleLabelFirstRender(up)};
  ${transitions.basic};

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  box-decoration-break: clone;
`;

const InputNormalizedLabel = styled(InputLabel)`
  position: unset;
  left: unset;
  cursor: pointer;
`;

const InputErrorWrapper = styled.div`
  position: absolute;
  top: 98%;
  left: 0;
  right: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(props) => props.theme.errorColor};
  padding: 0 0.5rem;
  display: flex;
`;

const InputError = styled.span`
  user-select: none;
  cursor: text;
  font-size: 0.65rem;
  height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.errorColor};
  margin-top: 0.15rem;
`;

const InputFieldWrapper = styled.div`
  width: -webkit-fill-available;
  padding: 0 0.5rem;
`;

const InputFeedbackWrapper = styled.div`
  padding: 1rem;
  padding-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Input = {
  Group: InputGroup,
  Container: InputContainer,
  NormalizedContainer: InputNormalizedContainer,
  Field: InputField,
  Label: InputLabel,
  NormalizedLabel: InputNormalizedLabel,
  ErrorWrapper: InputErrorWrapper,
  Error: InputError,
  FieldWrapper: InputFieldWrapper,
  FeedbackWrapper: InputFeedbackWrapper,
  IconWrapper: InputIconWrapper,
};

export default Input;

const getSelectionPosition = (isTop?: boolean) => {
  if (isTop ?? false) {
    return css`
      bottom: 65px;
    `;
  }

  return css`
    top: 100%;
  `;
};

const SelectOptionsWrapper = styled.div<ISelectOptionWrapper>`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.25rem;
  ${shadows.basic}

  ${({ isTop }) => getSelectionPosition(isTop)}
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
  max-height: fit-content;
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
    background: ${isPreSelected
      ? theme.preSelectColor
      : isSelected
      ? theme.secondary
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
