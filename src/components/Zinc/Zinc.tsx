import React, { useCallback } from "react";
import ZincStyle from "./style";
import { IZinc } from "./interface";
import { GTTooltip } from "../Tooltip";

function Zinc({ text, title, children }: IZinc) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const isPressed = React.useRef(false);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (ref.current == null) return;

      // rotate
      const x =
        ((event.clientX - ref.current.offsetLeft) / ref.current.clientWidth) *
        2;
      const y =
        ((event.clientY - ref.current.offsetTop) / ref.current.clientHeight) *
        2;

      const scale = isPressed.current ? 0.9 : 1;

      ref.current.style.transform = `perspective(1000px) rotateX(${
        y * 15
      }deg) rotateY(${-x * 15}deg) scale(${scale})`;

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
      onMouseDown={() => (isPressed.current = true)}
      onMouseUp={() => (isPressed.current = false)}
      width={100}
    >
      {children}
      <GTTooltip parentRef={ref} title={title} text={text} />
    </ZincStyle.Wrapper>
  );
}

export default Zinc;
