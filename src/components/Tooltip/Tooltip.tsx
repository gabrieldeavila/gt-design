/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultClientBoundings } from "../../utils/default";
import { IGTTooltip } from "./interface";
import Tooltip from "./style";

function GTTooltip({ title, text, parentRef }: IGTTooltip) {
  const { t } = useTranslation();

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // it is used to force the tooltip to update the position when the window is resized
  const [updateParams, setUpdateParams] = useState<boolean>(false);

  // info about the tooltip element
  const { height: tooltipHeight, width: tooltipWidth } =
    tooltipRef.current?.getBoundingClientRect() ?? defaultClientBoundings;

  // width of the parent element
  const {
    width: parentWidth,
    height: parentHeight,
    right,
    y,
    top: parentTop,
  } = useMemo(
    () => parentRef?.current?.getBoundingClientRect() ?? defaultClientBoundings,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateParams]
  );

  // update the tooltip position when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setUpdateParams((prev) => !prev);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevAboveParent = useRef<boolean>(false);

  // if the tooltip should be shown above the parent element
  const isAboveParent = useMemo(() => {
    if (prevAboveParent.current) {
      return false;
    }

    const isAbove = y - tooltipHeight - 20 >= 0;

    if (!isAbove && tooltipRef.current != null) {
      prevAboveParent.current = true;
    }

    return isAbove;
  }, [tooltipHeight, y]);

  const tooltipTop = useMemo(() => {
    if (isAboveParent) {
      return parentTop - tooltipHeight - 20;
    } else {
      return y + parentHeight;
    }
  }, [isAboveParent, parentTop, tooltipHeight, y, parentHeight]);

  // find the left position of the tooltip
  const left = useMemo(
    () => right - parentWidth / 2 - tooltipWidth / 2 - 1,
    [right, tooltipWidth, parentWidth]
  );

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
        {title != null && <Tooltip.Title> {t(title)} </Tooltip.Title>}

        {text != null && <Tooltip.Text>{t(text)}</Tooltip.Text>}
      </Tooltip.Container>
    </Tooltip.Wrapper>
  );
}

export default memo(GTTooltip);
