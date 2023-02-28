import React, { useCallback, useEffect, useState } from "react";
import { IGTNormalSwitch } from "../interface";
import NormalSwitch from "../Normal";

function GTNormalSwitch({ isChecked, name, onSwitchChange }: IGTNormalSwitch) {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(isChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const handleClick = useCallback(() => {
    setChecked((prev) => {
      const newValue = !prev;
      onSwitchChange?.(newValue);
      return newValue;
    });
  }, [onSwitchChange]);

  return (
    <NormalSwitch.Container
      type="button"
      id={name}
      name={name}
      isChecked={checked}
      onClick={handleClick}
    >
      <NormalSwitch.Wrapper>
        <NormalSwitch.Slider isChecked={checked} />
      </NormalSwitch.Wrapper>
    </NormalSwitch.Container>
  );
}

export default GTNormalSwitch;
