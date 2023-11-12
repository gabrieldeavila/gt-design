import React from "react";
import CanarySty from "./style";

const BLOCKS_ARRAY = Array.from(Array(10).keys());

function Canary() {
  return (
    <CanarySty.Wrapper>
      <CanarySty.Header />

      <CanarySty.Blocks>
        {BLOCKS_ARRAY.map((block) => (
          <CanarySty.Block key={block} />
        ))}
      </CanarySty.Blocks>
    </CanarySty.Wrapper>
  );
}

export default Canary;
