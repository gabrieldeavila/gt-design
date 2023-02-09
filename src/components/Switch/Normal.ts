import styled from "styled-components";
import { transitions } from "../../utils";

const NormalSwitchSlider = styled.div`
  position: absolute;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 1rem;
  background: #696969;
  ${transitions.basic};
`;

const NormalSwitchContainer = styled.div`
  background: #e7feff;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;

  &:active ${NormalSwitchSlider} {
    width: 1.5rem;
  }
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
