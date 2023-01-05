/* eslint-disable multiline-ternary */
import React, { useCallback, useRef, useState } from "react";
import * as Icon from "react-feather";
import Space from "../../Space/Space";
import Symbol from "../../Symbol/Symbol";
import { IGTSymbolPopup } from "../interface";
import Popup from "../Popup";

function GTSymbolPopup({ img, alt, children }: IGTSymbolPopup) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Symbol.Wrapper ref={ref}>
      <Symbol.Container>
        {!open ? (
          <Symbol.Image onClick={handleOpen} src={img} alt={alt} />
        ) : (
          <Space.Modifiers
            onClick={handleClose}
            addOns={["middle", "center", "full-space"]}
          >
            <Icon.X />
          </Space.Modifiers>
        )}
      </Symbol.Container>

      <Popup.Wrapper avoidComponents={[ref]} open={open} setOpen={setOpen}>
        {children}
      </Popup.Wrapper>
    </Symbol.Wrapper>
  );
}

export default GTSymbolPopup;
