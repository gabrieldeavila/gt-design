/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGTTooltip } from "./interface";
import Tooltip from "./style";

function GTTooltip({ title, text, parentRef }: IGTTooltip) {
  const { t } = useTranslation();

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // info about the tooltip element
  const { height = 1, width: tooltipWidth = 1, top = 1 } = (tooltipRef.current?.getBoundingClientRect()) ?? {};

  // width of the parent element
  const { width = 1, height: parentHeight = 1, right = 1, y = 1, top: pTop = 1 } = parentRef?.current?.getBoundingClientRect() ?? {};

  const prevAboveParent = useRef<boolean>(false);

  // if the tooltip should be shown above the parent element 🤷‍♂️
  const isAboveParent = useMemo(() => {
    if (prevAboveParent.current) {
      return false;
    }
    // const isAbove = top > 0 || top < -height;
    const isAbove = (y - height - 20) >= 0;
    console.log(isAbove, y - height);

    if (!isAbove && tooltipRef.current != null) {
      prevAboveParent.current = true;
    }

    return isAbove;
  }, [height, y]);

  const tooltipTop = useMemo(() => {
    if (isAboveParent) {
      console.log("parent", parentRef.current?.getBoundingClientRect());
      console.log("tooltip", tooltipRef.current?.getBoundingClientRect());
      return pTop - height - 20;
    } else {
      return y + parentHeight;
    }
  }, [isAboveParent, parentRef, pTop, height, y, parentHeight]);

  // find the left position of the tooltip
  // const left = width / 2 - tooltipWidth / 2;
  const left = (right - width / 2) - tooltipWidth / 2;

  // if the tooltip should be shown
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // ref to set if it's the first render
  const firstShowSet = useRef<boolean>(false);

  // memo to force the tooltip to NOT be shown on the first render
  const isFirst = useMemo(() => {
    if (firstShowSet.current) {
      return false;
    }

    firstShowSet.current = true;
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTooltip]);

  // if the mouse is not over the parent
  const leavedParent = useRef<boolean>(false);

  useEffect(() => {
    // show only if the mouse is over the parent
    const handleMouseEnter = () => {
      leavedParent.current = false;
      setShowTooltip(true);
    };

    // hide if the mouse is not over the parent
    const handleMouseLeave = () => {
      leavedParent.current = true;
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

  useEffect(() => {
    // if tooltipRef is hovered, hide the tooltip, so avoiding visual bugs
    const handleMouseEnter = () => {
      setShowTooltip(false);
    };

    const handleMouseLeave = () => {
      // if the mouse is not over the parent, don't show the tooltip
      if (leavedParent.current) return;

      setShowTooltip(true);
    };

    const tooltip = tooltipRef.current;

    tooltip?.addEventListener("mouseenter", handleMouseEnter);
    tooltip?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tooltip?.removeEventListener("mouseenter", handleMouseEnter);
      tooltip?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // avoids visual bugs, like can't click on the input because
  // the tooltip is above it
  const [zIndex, setZIndex] = useState<number>(1);

  useEffect(() => {
    let clearTimer: NodeJS.Timeout;

    // if the tooltip is shown, set the zIndex to 1
    if (showTooltip) {
      setZIndex(1);
    } else {
      // if the tooltip is not shown, set the zIndex to -1
      clearTimer = setTimeout(() => {
        setZIndex(-1);
      }, 200);
    }

    return () => {
      clearTimeout(clearTimer);
    };
  }, [showTooltip]);

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Wrapper
      zIndex={zIndex}
      ref={tooltipRef}
      isAboveParent={isAboveParent}
      isFirstRender={isFirst}
      left={left}
      top={tooltipTop}
      show={showTooltip}
    >
      <Tooltip.Container isAboveParent={isAboveParent}>
        {
          (title != null) &&
          <Tooltip.Title> {t(title)} </Tooltip.Title>
        }

        {
          (text != null) &&
          <Tooltip.Text>
            {t(text)}
          </Tooltip.Text>
        }

      </Tooltip.Container>
    </Tooltip.Wrapper >

  );
}

export default GTTooltip;
