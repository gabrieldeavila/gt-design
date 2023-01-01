import PropTypes from "prop-types";
import React, { useCallback, useId, useMemo, useState } from "react";
import { IGTActiveSwitch } from "../interface";
import Switch from "../Switch";

function GTActiveSwitch({ isChecked, onChange }: IGTActiveSwitch) {
  const id = useId();
  const labelId = useMemo(() => `label-${id}`, [id]);

  const [checked, setChecked] = useState(isChecked);

  const handleSwitch = useCallback(() => {
    setChecked((checked) => {
      const newValue = !(checked ?? false);

      onChange?.(newValue);
      return newValue;
    });
  }, [onChange]);

  return (
    <Switch.Label htmlFor={labelId} mode="active" checked={checked}>
      <Switch.Input
        mode="active"
        id={labelId}
        checked={checked}
        onChange={handleSwitch}
        type="checkbox"
      />

      <Switch.Slider />
    </Switch.Label>
  );
}

export default GTActiveSwitch;

// add default proptype
GTActiveSwitch.propTypes = {
  isInitialChecked: PropTypes.bool,
};

// add default props
GTActiveSwitch.defaultProps = {
  isInitialChecked: false,
};
