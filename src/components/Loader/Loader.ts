import styled from "styled-components";
import { ILoader } from "./interface";

interface Size {
  [key: string]: number;
}

const sizeOptions : Size = {
  small: 1,
  normal: 2.5,
  medium: 5,
  large: 7.5,
  extra_large: 10,
};

const getSize = (size?: string) => {
  let val = sizeOptions.normal;

  if (size) {
    val = sizeOptions[size as keyof Size] || parseFloat(size);
  }

  return { border: `${val * 0.1}rem`, wh: `${val}rem` };
};

const Loader = styled.div<ILoader>`
  margin: 1rem 0;
  border-radius: 50%;
  width: ${(props) => getSize(props.size).wh};
  height: ${(props) => getSize(props.size).wh};
  border: ${(props) => getSize(props.size).border} solid
    ${(props) => props.theme.contrast};
  border-top: ${(props) => getSize(props.size).border} solid transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
