import PropTypes from "prop-types";
import React, { memo, useMemo } from "react";
import { Loader as FLoader } from "react-feather";
import styled from "styled-components";
import { ILoader, LoaderSize } from "./interface";

export const LoaderWrapper = styled.div`
  display: flex;

  & svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

type TSize = { [key in LoaderSize]: number };

const sizes: TSize = {
  sm: 16,
  md: 24,
  lg: 32,
};

function LoaderSimple({ size = "sm", color }: ILoader) {
  const sizeValue = useMemo(() => {
    return sizes[size ?? "sm"];
  }, [size]);

  return (
    <LoaderWrapper>
      <FLoader size={sizeValue} color={color} className="svg-no-active" />
    </LoaderWrapper>
  );
}

LoaderSimple.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

const Loader = {
  Simple: memo(LoaderSimple),
};

export default Loader;
