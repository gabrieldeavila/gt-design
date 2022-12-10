import React, { useRef } from "react";
import { ITeaserTip } from "../interface";
import Tooltip from "../Tooltip";

function TeaserTip({ title, text }: ITeaserTip) {
  const teaserRef = useRef<HTMLDivElement>(null);

  const { height = 1 } = teaserRef.current?.getBoundingClientRect() || {};

  return (
    <Tooltip.Wrapper ref={teaserRef} top={height}>
      <Tooltip.Container>
        {
          (title != null) &&
          <Tooltip.Title> {title}</Tooltip.Title>
        }

        {
          (text != null) &&
          <Tooltip.Text>
            {text}
          </Tooltip.Text>
        }

      </Tooltip.Container>
    </Tooltip.Wrapper >
  );
}

export default TeaserTip;
