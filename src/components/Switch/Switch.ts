import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { animations, transforms } from "../../utils";
import flex from "../../utils/flex";
import transitions from "../../utils/transitions";
import { ISwitch } from "./interface";

const fixedIcon = css`
  position: fixed;

  ${({ placeX }: { placeX: string; placeY: string }) => [placeX]} : 1rem;
  ${({ placeY }) => [placeY]} : 1.5rem;
`;

const SwitchSlider = styled.span`
  position: absolute;
  padding: 0.5rem;
  top: 0.14rem;
  left: 0.1rem;
  bottom: 0;
  display: block;
  cursor: pointer;
  height: 0.5rem;
  width: 1rem;
  z-index: 150;
  border-radius: 50%;
  background: ${(props) => props.theme.primary};
  width: 1rem;
  height: 1rem;
  ${flex.alignCenter}
  ${transitions.basic}

  & .sun {
    stroke: ${(props) => props.theme.sunColor};
    z-index: 200;
  }

  & .moon {
    stroke: ${(props) => props.theme.moonColor};
    z-index: 200;
  }
`;

const SwitchLabel = styled.label<ISwitch>`
  margin-top: 1rem;
  width: 4rem;
  height: 1.25rem;
  z-index: 1;
  padding: 0.5rem;
  border-radius: 1.75rem;
  background: ${(props) => transparentize(0.5, props.theme.contrast)};
  position: relative;
  user-select: none;
  cursor: pointer;

  ${flex.alignCenter} /* disable typescript */

  ${({ fixed }): any => fixed && fixedIcon}

  &:active ${SwitchSlider} {
    ${transforms.press}
  }
`;

const SwitchInput = styled.input`
  display: none;

  &:checked ~ ${SwitchSlider} {
    left: 58%;
  }
`;

const SwitchIconWrapper = styled.div`
  padding: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;

  ${flex.justifyBetween}

  & > svg {
    stroke: ${(props) => props.theme.primary};

    &:active {
      animation: shake 0.5s linear infinite;
    }
  }

  ${animations.shake}
`;

export default {
  Label: SwitchLabel,
  Input: SwitchInput,
  Slider: SwitchSlider,
  IconWrapper: SwitchIconWrapper,
};
