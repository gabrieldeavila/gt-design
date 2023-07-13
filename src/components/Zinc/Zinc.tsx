import React, { useCallback } from "react";
import ZincStyle from "./style";
import { IZinc } from "./interface";
import { GTTooltip } from "../Tooltip";

function Zinc({ text, title, children }: IZinc) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const isPressed = React.useRef(false);
  const lastInteraction = React.useRef(0);

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

      const scale = isPressed.current ? 0.9 : 1;

      ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

      // also adds a background linear according to the mouse position
      ref.current.style.background = `linear-gradient(${
        x * 15
      }deg, var(--contrast-0_9), var(--secondary-0_8))`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (ref.current == null) return;

    ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    ref.current.style.background = "var(--secondary-0_8)";
  }, []);

  return (
    <ZincStyle.Wrapper
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => {
        isPressed.current = true;
        lastInteraction.current = 0;
      }}
      onMouseUp={() => (isPressed.current = false)}
    >
      {children}
      <GTTooltip parentRef={ref} title={title} text={text} />
    </ZincStyle.Wrapper>
  );
}

export default Zinc;
