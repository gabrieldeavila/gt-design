/* eslint-disable multiline-ternary */
import React, {
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import OptionsSt from "./style";
import { IOptions, IOptionsItems } from "./interface";

function Options({ items, parentRef }: IOptions) {
  const [show, setShow] = useState<boolean>(false);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current == null) return;

    // gets when the parent is clicked
    const handleClick = (e: Event) => {
      console.log("ok", parentRef.current?.getBoundingClientRect());
      setShow(true);
    };

    const parent = parentRef.current;

    parent.addEventListener("click", handleClick);

    return () => {
      parent.removeEventListener("click", handleClick);
    };
  }, [parentRef]);

  return (
    <OptionsSt.Wrappper show={show} ref={optionRef}>
      <OptionsSt.Container>
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </OptionsSt.Container>
    </OptionsSt.Wrappper>
  );
}

export default Options;

const Item = memo(({ name, value, onClick }: IOptionsItems) => {
  const handleClick = useCallback(() => {
    onClick?.(value);
  }, [onClick, value]);

  return (
    <OptionsSt.Item.Wrapper role="button" onClick={handleClick}>
      <OptionsSt.Item.Container>
        <OptionsSt.Item.Value>{name}</OptionsSt.Item.Value>
      </OptionsSt.Item.Container>
    </OptionsSt.Item.Wrapper>
  );
});

Item.displayName = "Options.Items";
