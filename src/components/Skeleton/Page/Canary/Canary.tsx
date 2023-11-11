import React, { useEffect, useRef } from "react";
import CanarySty from "./style";

const BLOCKS_ARRAY = Array.from(Array(10).keys());

function Canary() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current == null) return;

    const availableHeight = window.innerHeight;

    const parent = ref.current.parentElement;
    const top = ref.current.offsetTop;
    const parentPadding = parseFloat(
      window.getComputedStyle(parent ?? document.body).padding
    );

    const height = availableHeight - top - parentPadding;

    ref.current.style.height = `${height}px`;
  }, [ref]);

  return (
    <CanarySty.Wrapper ref={ref}>
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
