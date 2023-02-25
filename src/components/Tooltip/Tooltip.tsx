/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { IGTTooltip, IGTTooltipRef } from "./interface";
import Tooltip from "./style";

const GTTooltip = forwardRef((props: IGTTooltip, ref?: Ref<IGTTooltipRef>) => {
  const { title, text, parentRef }: IGTTooltip = props;

  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        // this is the function that will be called by the parent element
        // to show the tooltip
        show: () => {
          setShow(true);
        },
        // this is the function that will be called by the parent element
        // to hide the tooltip
        hide: () => {
          setShow(false);
        },
      };
    },
    [setShow]
  );

  const handleMouseOverParent = useMemo(() => {
    return () => {
      if (parentRef.current) {
        setShow(true);
      }
    };
  }, [parentRef]);

  const handleMouseOutParent = useMemo(() => {
    return () => {
      setShow(false);
    };
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

  const handleMouseOverTooltip = useCallback(() => {
    setShow(false);
  }, []);

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Content show={show} onMouseOver={handleMouseOverTooltip}>
      <Tooltip.Wrapper ref={tooltipRef}>
        <Tooltip.Container>
          {title != null && <Tooltip.Title> {t(title)} </Tooltip.Title>}

          {text != null && <Tooltip.Text>{t(text)}</Tooltip.Text>}
        </Tooltip.Container>
      </Tooltip.Wrapper>
    </Tooltip.Content>
  );
});

GTTooltip.displayName = "GTTooltip";

export default memo(GTTooltip);
