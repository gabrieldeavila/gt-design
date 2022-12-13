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
  const { height = 1, width: tooltipWidth = 1, top = 1, } = (tooltipRef.current?.getBoundingClientRect()) ?? {};

  // width of the parent element
  const { width = 1, height: parentHeight = 1 } = parentRef?.current?.getBoundingClientRect() ?? {};

  const prevAboveParent = useRef<boolean>(false);

  // if the tooltip should be shown above the parent element 🤷‍♂️
  const isAboveParent = useMemo(() => {
    if (prevAboveParent.current) {
      return false;
    }

    const isAbove = top > 0 || top < -height;

    if (!isAbove) {
      prevAboveParent.current = true;
    }

    return isAbove;
  }, [height, top]);

  const tooltipTop = useMemo(() => {
    if (isAboveParent) {
      return height;
    } else {
      return parentHeight;
    }
  }, [height, isAboveParent, parentHeight]);

  // find the left position of the tooltip
  const left = width / 2 - tooltipWidth / 2;

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

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Wrapper ref={tooltipRef} isAboveParent={isAboveParent} isFirstRender={isFirst} left={left} top={tooltipTop} show={true}>
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
