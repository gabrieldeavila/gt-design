import React, { useCallback, useRef } from "react";
import ZincStyle from "./style";
import { IZinc } from "./interface";
import { GTTooltip } from "../Tooltip";

function Zinc({ text, title, children, onClick }: IZinc) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const isPressed = React.useRef(false);
  const lastInteraction = React.useRef(0);
  const info = useRef({ transform: "", isDown: false });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (ref.current == null) return;

      // if last interaction was less than 100ms ago, do nothing
      if (Date.now() - lastInteraction.current < 100) return;
      lastInteraction.current = Date.now();

      const perspective = Math.min(
        Math.max((event.clientX / ref.current.clientWidth) * 1000, 1000),
        1200
      );

      // rotate
      const x = (event.clientX - ref.current.offsetLeft) / 100;
      const y = (event.clientY - ref.current.offsetTop) / 100;
      // min 0deg and max 5deg
      const rotateX = Math.min(Math.max(x, 0), 5);
      const rotateY = Math.min(Math.max(y, 0), 5);

      info.current.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const transform = `${info.current.transform} ${
        info.current.isDown ? "scale(0.95)" : "scale(1)"
      }`;

      ref.current.style.transform = transform;

      // also adds a background linear according to the mouse position
      ref.current.style.background = `linear-gradient(${
        x * 15
      }deg, var(--contrast-0_9), var(--primary-0_5))`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (ref.current == null) return;

    ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    ref.current.style.background = "var(--containerSecondary)";
    info.current.isDown = false;
  }, []);

  const handleMouseDown = useCallback(() => {
    if (ref.current == null) return;

    lastInteraction.current = 0;
    info.current.isDown = true;
    ref.current.style.transform = `${info.current.transform} scale(0.95)`;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (ref.current == null) return;

    isPressed.current = false;
    info.current.isDown = false;
    ref.current.style.transform = `${info.current.transform} scale(1)`;
  }, []);

  return (
    <>
      <ZincStyle.Wrapper
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </ZincStyle.Wrapper>
      <GTTooltip parentRef={ref} title={title} text={text} />
    </>
  );
}

export default Zinc;
