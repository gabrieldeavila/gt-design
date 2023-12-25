/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import clsx from "clsx";
import React, { useRef } from "react";
import { Loader } from "react-feather";
import useGTTranslate from "../../gt/Global/translate";
import Space from "../Space/Space";
import Text from "../Text";
import "./style.css";

const Loading = ({
  avoidClose,
  show,
}: {
  avoidClose?: boolean;
  show: boolean;
}) => {
  const canvasRef = useRef(null);
  const { translateThis } = useGTTranslate();

  return (
    <div
      className={clsx(
        "loading-content",
        !avoidClose && !show && "loading-is-done"
      )}
    >
      <Space.Modifiers
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        top="20%"
        left="0"
        right="0"
        position="fixed"
        zIndex="2"
      >
        <div className="loader-anim">
          <Loader />
        </div>
        <Text.P fontWeight="200" textAlign="center" fontSize="20px">
          {translateThis("LOADING")}
        </Text.P>
      </Space.Modifiers>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default Loading;
