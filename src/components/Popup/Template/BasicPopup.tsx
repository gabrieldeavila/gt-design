/* eslint-disable multiline-ternary */
import React, { useCallback, useRef, useState } from "react";
import * as Icon from "react-feather";
import Space from "../../Space/Space";
import Symbol from "../../Symbol/Symbol";
import Popup from "../Popup";

function SymbolPopup() {
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
          <Symbol.Image
            onClick={handleOpen}
            src="https://thispersondoesnotexist.com/image"
          />
        ) : (
          <Space.Modifiers addOns={["middle", "center", "full-space"]}>
            <Icon.X onClick={handleClose} />
          </Space.Modifiers>
        )}
      </Symbol.Container>

      <Popup.Wrapper avoidComponents={[ref]} open={open} setOpen={setOpen}>
        <Popup.Container>Redireciona-me</Popup.Container>
      </Popup.Wrapper>
    </Symbol.Wrapper>
  );
}

export default SymbolPopup;
