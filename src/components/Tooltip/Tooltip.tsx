/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useGTTranslate from "../../gt/Global/translate";
import { IGTTooltip, IGTTooltipRef } from "./interface";
import Tooltip from "./style";

const clearTimeOut = (timeOut: NodeJS.Timeout | null) => {
  if (timeOut) {
    clearTimeout(timeOut);
  }
};

const GTTooltip = forwardRef((props: IGTTooltip, ref?: Ref<IGTTooltipRef>) => {
  const { title, text, parentRef }: IGTTooltip = props;
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { translateThis } = useGTTranslate();
  const [show, setShow] = useState(false);
  const [isAboveParent, setIsAboveParent] = useState(false);

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

  const [info, setInfo] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (parentRef.current) {
      setInfo(parentRef.current.getBoundingClientRect());
    }
  }, [parentRef]);

  const handleMouseOverParent = useCallback(() => {
    if (typeof window === "undefined") return;

    if (parentRef.current) {
      setInfo(parentRef.current.getBoundingClientRect());

      // gets the position of the parent element
      const pos = parentRef.current.getBoundingClientRect();
      const isAtTheBottom = pos.bottom + 100 > window.innerHeight;

      setIsAboveParent(isAtTheBottom);
      timeOut.current = setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [parentRef]);

  const handleMouseOutParent = useCallback(() => {
    clearTimeOut(timeOut.current);
    setShow(false);
  }, []);

  const handleMouseOverTooltip = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    // gets when the mouse is over the parent element for more than 0.5 seconds
    // add event listener to the parent element
    const parentElement = parentRef.current;

    if (!parentElement) return;

    parentElement.addEventListener("mouseenter", handleMouseOverParent);
    parentElement.addEventListener("mouseleave", handleMouseOutParent);

    return () => {
      parentElement.removeEventListener("mouseenter", handleMouseOverParent);
      parentElement.removeEventListener("mouseleave", handleMouseOutParent);
    };
  }, [handleMouseOutParent, handleMouseOverParent, parentRef]);

  // ref to the tooltip element
  const tooltipRef = useRef<HTMLDivElement>(null);

  // if there's no title or text, don't render the tooltip
  if (!title && !text) return null;

  return (
    <Tooltip.Content
      isAboveParent={isAboveParent}
      show={show}
      style={{
        top: isAboveParent ? info.top - (tooltipRef.current?.getBoundingClientRect()?.height ?? 15) : info.bottom,
        left: info.left + info.width / 2 - info.width * 0.05,
      }}
      onMouseOver={handleMouseOverTooltip}
    >
      <Tooltip.Wrapper isAboveParent={isAboveParent} ref={tooltipRef}>
        <Tooltip.Container isAboveParent={isAboveParent}>
          {title != null && (
            <Tooltip.Title> {translateThis(title)} </Tooltip.Title>
          )}

          {text != null && <Tooltip.Text>{translateThis(text)}</Tooltip.Text>}
        </Tooltip.Container>
      </Tooltip.Wrapper>
    </Tooltip.Content>
  );
});

GTTooltip.displayName = "GTTooltip";

export default memo(GTTooltip);
