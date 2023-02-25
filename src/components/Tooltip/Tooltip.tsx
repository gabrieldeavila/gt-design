/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { memo, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IGTTooltip } from "./interface";
import Tooltip from "./style";

function GTTooltip({ title, text, parentRef }: IGTTooltip) {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);

  const handleMouseOverParent = useCallback(() => {
    if (parentRef.current) {
      setShow(true);
    }
  }, [parentRef]);

  const handleMouseOutParent = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    // gets when the mouse is over the parent element for more than 0.5 seconds
    // add event listener to the parent element
    const parentElement = parentRef.current;

    if (!parentElement) return;

    parentElement.addEventListener("mouseover", handleMouseOverParent);

    parentElement.addEventListener("mouseout", handleMouseOutParent);

    return () => {
      parentElement.removeEventListener("mouseover", handleMouseOverParent);
      parentElement.removeEventListener("mouseout", handleMouseOutParent);
    };
  }, [handleMouseOutParent, handleMouseOverParent, parentRef]);

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Content show={show}>
      <Tooltip.Wrapper ref={tooltipRef}>
        <Tooltip.Container>
          {title != null && <Tooltip.Title> {t(title)} </Tooltip.Title>}

          {text != null && <Tooltip.Text>{t(text)}</Tooltip.Text>}
        </Tooltip.Container>
      </Tooltip.Wrapper>
    </Tooltip.Content>
  );
}

export default memo(GTTooltip);
