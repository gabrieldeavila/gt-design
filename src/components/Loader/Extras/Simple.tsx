import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Loader } from "react-feather";
import { ILoader, LoaderSize } from "../interface";
import { LoaderWrapper } from "../Loader";

type TSize = { [key in LoaderSize]: number };

const sizes: TSize = {
  sm: 16,
  md: 24,
  lg: 32,
};

function LoaderSimple({ size }: ILoader) {
  const sizeValue = useMemo(() => {
    return sizes[size ?? "md"];
  }, [size]);

  return (
    <LoaderWrapper>
      <Loader size={sizeValue} className="svg-no-active" />
    </LoaderWrapper>
  );
}

export default LoaderSimple;

LoaderSimple.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

LoaderSimple.defaultProps = {
  size: "md",
};
