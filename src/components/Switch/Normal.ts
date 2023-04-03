import { transparentize } from "polished";
import styled from "styled-components";
import { shadows, transitions } from "../../utils";
import { INormalSwitchSlider } from "./interface";

const NormalSwitchSlider = styled.div<INormalSwitchSlider>`
  position: absolute;
  height: 1.2rem;
  width: 1.2rem;
  inset-inline-start: ${({ isChecked }) =>
    isChecked ?? false ? "calc(100% - 1.2rem)" : "0"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    border-radius: 1rem;
    background: ${transparentize(0.1, "var(--switchSlider)")};
    ${transitions.basic};

    ${shadows.basic}
  }

  ${transitions.basic};
`;

const NormalSwitchContainer = styled.button<INormalSwitchSlider>`
  padding: 0;
  background: ${({ isChecked }) =>
    isChecked ?? false
      ? "var(--switchNormalActive)"
      : transparentize(0.5, "var(--switchNormalBackground)")};
  overflow: hidden;
  display: flex;
  border: none;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;

  &:active ${NormalSwitchSlider}::before {
    inset-inline-end: ${({ isChecked }) => (isChecked ?? false ? "0" : "-5px")};
    inset-inline-start: ${({ isChecked }) =>
      isChecked ?? false ? "-5px" : ""};
  }

  &:hover {
    background: ${({ isChecked }) =>
      isChecked ?? false
        ? transparentize(0.25, "var(--switchNormalActive)")
        : "var(--switchNormalBackground)"};
  }

  ${transitions.basic};
`;

const NormalSwitchWrapper = styled.div`
  position: relative;
  min-width: 2.5rem;
  height: 1.25rem;
  margin: 0.1rem;
  display: flex;
  align-items: center;
`;

const NormalSwitch = {
  Container: NormalSwitchContainer,
  Wrapper: NormalSwitchWrapper,
  Slider: NormalSwitchSlider,
};

export default NormalSwitch;
