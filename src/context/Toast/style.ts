import styled from "styled-components";
import { IToastStyle } from "./interface";
import { shadows, transitions } from "../../utils";

const ToastWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 99999;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-end;
  cursor: default;
  transition: all 0.3s ease-in-out;
`;

const ToastContent = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 5px;
  min-width: 15rem;
  max-width: 20rem;
  min-height: 1.5rem;
  max-height: 20rem;
  background-color: var(--secondary);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  gap: 0.5rem;

  @keyframes show {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation: show 0.2s ease-in-out;

  &.hide {
    @keyframes hide {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    animation: hide 0.2s ease-in-out;
    animation-fill-mode: forwards; /* Prevent the animation from going back */
  }

  ${shadows.simple};
  ${transitions.linear};

  svg {
    width: 1rem;
  }

  .toast_close {
    cursor: pointer;
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    fill: var(--contrast);
  }
`;

const ToastTimer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--contrast);
  border-radius: 2px;

  &.warning {
    background-color: var(--warning);
  }

  &.success {
    background-color: var(--success);
  }

  &.error {
    background-color: var(--error);
  }

  &.info {
    background-color: var(--info);
  }

  ${transitions.linear}
`;

const Toast: IToastStyle = {
  Wrapper: ToastWrapper,
  Content: ToastContent,
  Timer: ToastTimer,
};

export default Toast;
