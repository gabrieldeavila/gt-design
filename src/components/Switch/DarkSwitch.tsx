import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
// @ts-ignore
import * as Icon from "react-feather";
import { useGTContext } from "../../context/gt";
import Switch from "./Switch";

function GTDarkSwitch({
  fixed,
  placeX,
  placeY,
}: {
  fixed: boolean;
  placeX: string;
  placeY: string;
}) {
  const { darkTheme, setDarkTheme } = useGTContext();

  const handleTheme = useCallback(() => {
    setDarkTheme((prev: boolean) => {
      if (!prev) {
        localStorage.setItem("darkTheme", "1");
      } else {
        localStorage.removeItem("darkTheme");
      }

      return !prev;
    });
  }, [setDarkTheme]);

  return (
    <Switch.Label
      fixed={fixed}
      placeX={placeX}
      placeY={placeY}
      htmlFor="darkId"
    >
      <Switch.Input
        id="darkId"
        checked={darkTheme}
        onChange={handleTheme}
        type="checkbox"
      />
      <Switch.Slider>
        {!darkTheme ? (
          <Icon.Sun className="sun" />
        ) : (
          <Icon.Moon className="moon" />
        )}
      </Switch.Slider>

      <Switch.IconWrapper>
        <Icon.Sun />
        <Icon.Moon />
      </Switch.IconWrapper>
    </Switch.Label>
  );
}

export default memo(GTDarkSwitch);

// add default proptype
GTDarkSwitch.propTypes = {
  fixed: PropTypes.bool,
  placeX: PropTypes.oneOf([null, "top", "bottom"]),
  placeY: PropTypes.oneOf([null, "left", "right"]),
};

// add default props
GTDarkSwitch.defaultProps = {
  fixed: false,
  placeX: "bottom",
  placeY: "right",
};
