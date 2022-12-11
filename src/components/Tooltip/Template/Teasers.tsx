/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useRef, useState } from "react";
import { ITeaserTip } from "../interface";
import Tooltip from "../Tooltip";

function TeaserTip({ title, text, parentRef }: ITeaserTip) {
  const teaserRef = useRef<HTMLDivElement>(null);

  const { height = 1, width: teaserWidth = 1 } = (teaserRef.current?.getBoundingClientRect()) ?? {};

  const { width = 1 } = parentRef?.current?.getBoundingClientRect() ?? {};

  const left = width / 2 - teaserWidth / 2;

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    // show only if the mouse is over the parent
    const handleMouseEnter = () => {
      setShowTooltip(true);
    };

    // hide if the mouse is not over the parent
    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

    const parent = parentRef.current;

    // add the event listeners
    parent?.addEventListener("mouseenter", handleMouseEnter);
    parent?.addEventListener("mouseleave", handleMouseLeave);

    // remove the event listeners
    return () => {
      parent?.removeEventListener("mouseenter", handleMouseEnter);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip.Wrapper ref={teaserRef} left={left} top={height} show={showTooltip}>
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
