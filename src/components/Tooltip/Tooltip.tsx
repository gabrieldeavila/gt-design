/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGTTooltip } from "./interface";
import Tooltip from "./style";

function GTTooltip({ title, text, parentRef }: IGTTooltip) {
  const { t } = useTranslation();

  const tooltipRef = useRef<HTMLDivElement>(null);

  const { height = 1, width: tooltipWidth = 1 } = (tooltipRef.current?.getBoundingClientRect()) ?? {};

  const { width = 1 } = parentRef?.current?.getBoundingClientRect() ?? {};

  const left = width / 2 - tooltipWidth / 2;

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const firstShowSet = useRef<boolean>(false);

  const isFirst = useMemo(() => {
    if (firstShowSet.current) {
      return false;
    }

    firstShowSet.current = true;
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTooltip]);

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

  if (!title && !text) return null;

  return (
    <Tooltip.Wrapper ref={tooltipRef} isFirstRender={isFirst} left={left} top={height} show={showTooltip}>
      <Tooltip.Container>
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
