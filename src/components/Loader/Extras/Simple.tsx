import React from "react";
import { Loader } from "react-feather";
import { LoaderWrapper } from "../Loader";

function LoaderSimple() {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
}

export default LoaderSimple;
