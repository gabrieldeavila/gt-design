/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IGTTooltip } from "./interface";
import Tooltip from "./style";

function GTTooltip({ title, text, parentRef }: IGTTooltip) {
  const { t } = useTranslation();

  const parentWidth = parentRef?.current?.offsetWidth ?? 0;

  console.log(parentWidth);

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Wrapper
      // zIndex={zIndex}
      ref={tooltipRef}
      // isAboveParent={isAboveParent}
      // left={left}
      // top={tooltipTop}
    >
      <Tooltip.Container>
        {title != null && <Tooltip.Title> {t(title)} </Tooltip.Title>}

        {text != null && <Tooltip.Text>{t(text)}</Tooltip.Text>}
      </Tooltip.Container>
    </Tooltip.Wrapper>
  );
}

export default memo(GTTooltip);
