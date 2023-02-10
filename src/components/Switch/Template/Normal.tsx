import React, { useCallback, useState } from "react";
import NormalSwitch from "../Normal";

function GTNormalSwitch() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <NormalSwitch.Container isChecked={checked} onClick={handleClick}>
      <NormalSwitch.Wrapper>
        <NormalSwitch.Slider isChecked={checked} />
      </NormalSwitch.Wrapper>
    </NormalSwitch.Container>
  );
}

export default GTNormalSwitch;
