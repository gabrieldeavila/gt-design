/* eslint-disable multiline-ternary */
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import * as Icon from "react-feather";
import Space from "../../Space/Space";
import Symbol from "../../Symbol/Symbol";
import { IGTBestSymbolOptions, IGTSymbolPopup } from "../interface";
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
          <BestSymbolOptions handleOpen={handleOpen} img={img} alt={alt} />
        ) : (
          <Space.Modifiers
            onClick={handleClose}
            addOns={["full-space"]}
            alignItems="center"
            justifyContent="center"
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

const BestSymbolOptions = memo(function BestSymbolOptions({
  handleOpen,
  img,
  alt,
}: IGTBestSymbolOptions) {
  // TO DO: implement a better way to get the symbol name
  const symbolName = useMemo(() => {
    // gets all the words in the alt
    const words = alt.split(" ");

    // gets the first word
    const firstWord = words[0];
    // gets the first letter of the first word
    const firstLetter = firstWord[0];

    // now we need to get the last word
    const lastWord = words[words.length - 1];
    // gets the first letter of the last word
    const lastLetter = lastWord[0];

    return `${firstLetter}${lastLetter}`;
  }, [alt]);

  if (img == null) {
    return (
      <Space.Modifiers
        onClick={handleOpen}
        addOns={["full-space"]}
        alignItems="center"
        justifyContent="center"
      >
        <Symbol.Text>{symbolName}</Symbol.Text>
      </Space.Modifiers>
    );
  }

  return <Symbol.Image onClick={handleOpen} src={img} alt={alt} />;
});
