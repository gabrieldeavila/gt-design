import { transparentize } from "polished";
import styled, { css } from "styled-components";
import { animations, transforms } from "../../utils";
import flex from "../../utils/flex";
import transitions from "../../utils/transitions";
import { ISwitch, ISwitchInput } from "./interface";

const fixedIcon = css`
  position: fixed;

  ${({ placeX }: { placeX: string; placeY: string }) => [placeX]} : 1rem;
  ${({ placeY }) => [placeY]} : 1.5rem;
`;

const SwitchSlider = styled.span`
  position: absolute;
  padding: 0.5rem;
  top: 0.14rem;
  left: 0.14rem;
  bottom: 0;
  display: block;
  cursor: pointer;
  height: 0.5rem;
  width: 1rem;
  z-index: 150;
  border-radius: 50%;
  box-shadow: 41px 41px 56px var(--primary),
    -41px -41px 56px var(--primary);
  background: var(--primary);
  width: 1rem;
  height: 1rem;
  ${flex.alignCenter}
  ${transitions.basic}

  & .sun {
    stroke: var(--sunColor);
    z-index: 200;
  }

  & .moon {
    stroke: var(--moonColor);
    z-index: 200;
  }
`;

/* if the slider is checked, add custom background to the label */
const activeLabel = css<ISwitch>`
  filter: contrast();
  background: ${({ checked }) =>
    checked ?? false
      ? transparentize(0.1, "var(--contrast)")
      : transparentize(0.5, "var(--contrast)")};
`;

const SwitchLabel = styled.label<ISwitch>`
  margin-top: 1rem;
  width: 4rem;
  height: 1.25rem;
  z-index: 1;
  padding: 0.5rem;
  border-radius: 1.75rem;
  background: linear-gradient(
    145deg,
    var(--contrast),
    ${transparentize(0.5, "var(--contrast)")}
  );

  position: relative;
  user-select: none;
  cursor: pointer;

  ${flex.alignCenter}

  ${({ fixed }): any => (fixed ?? false) && fixedIcon}

  ${({ mode }) => mode === "active" && activeLabel}

  &:active ${SwitchSlider} {
    ${transforms.XLpress}
  }
`;

const activeSlider = css`
  & ~ ${SwitchSlider} {
    filter: contrast(0.1);
  }

  &:checked ~ ${SwitchSlider} {
    background-color: var(--switchOn);
    filter: contrast(1);
    box-shadow: 0px 0px 7px var(--switchOn),
      -0px -0px 31px var(--switchOn);
  }

  & ~ ${SwitchSlider}:active, &:checked ~ ${SwitchSlider}:active {
    height: 0.8rem;
    width: 0.8rem;
    top: 8%;
  }
`;

const SwitchInput = styled.input<ISwitchInput>`
  display: none;

  &:checked ~ ${SwitchSlider} {
    left: 58%;
  }

  ${({ mode }) => mode === "active" && activeSlider};
`;

const SwitchIconWrapper = styled.div`
  padding: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;

  ${flex.justifyBetween}

  & > svg {
    stroke: var(--primary);

    &:active {
      animation: shake 0.5s linear infinite;
    }
  }

  ${animations.shake}
`;

const Switch = {
  Label: SwitchLabel,
  Input: SwitchInput,
  Slider: SwitchSlider,
  IconWrapper: SwitchIconWrapper,
};

export default Switch;
