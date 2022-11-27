import PropTypes from "prop-types";
import React, { useCallback, useId, useMemo, useState } from "react";
import { GTBasic } from "../../../gt";
import Switch from "../Switch";

function GTActiveSwitch({ isInitialChecked }: { isInitialChecked?: boolean; }) {
  const id = useId();
  const labelId = useMemo(() => `label-${id}`, [id]);

  const [checked, setChecked] = useState(isInitialChecked);

  const handleSwitch = useCallback(() => {
    setChecked((checked) => !(checked ?? false));
  }, []);

  return (
    <GTBasic>
      <Switch.Label
        htmlFor={labelId}
      >
        <Switch.Input
          mode="active"
          id={labelId}
          checked={checked}
          onChange={handleSwitch}
          type="checkbox"
        />

        <Switch.Slider />
      </Switch.Label>
    </GTBasic>
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
