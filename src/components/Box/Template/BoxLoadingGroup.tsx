import React from "react";
import { MotionBox } from "../../Motion";
import Box from "../Box";
import { IBoxLoadingGroup } from "../interface";

function BoxLoadingGroup({ boxes }: IBoxLoadingGroup) {
  const boxesArray = Array.from(Array(boxes).keys());

  return (
    <Box.Column>
      {boxesArray.map((box) => (
        <MotionBox key={box} isLoading>
          ---
        </MotionBox>
      ))}
    </Box.Column>
  );
}

export default BoxLoadingGroup;
