/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";
import React, { memo, useCallback, useMemo } from "react";
import * as Icon from "react-feather";
import { useTriggerState } from "react-trigger-state";
import Switch from "../Switch";

const initialTheme = () => {
  try {
    const theme =
      localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "darkTheme"
        : "theme");

    return theme;
  } catch (e) {
    console.log(e, "error");

    return false;
  }
};

function GTDarkSwitch({
  fixed,
  placeX,
  placeY,
}: {
  fixed: boolean;
  placeX: "top" | "bottom";
  placeY: "left" | "right";
}) {
  const [theme, setTheme] = useTriggerState({
    name: "curr_theme",
    initial: initialTheme(),
  });

  const handleTheme = useCallback(() => {
    try {
      setTheme((prev: string) => {
        const newTheme = prev === "theme" ? "darkTheme" : "theme";
        localStorage.setItem("theme", newTheme);

        return newTheme;
      });
    } catch (e) {
      console.log(e, "error");
    }
  }, [setTheme]);

  const isDarkTheme = useMemo(() => theme === "darkTheme", [theme]);

  return (
    <Switch.Label
      fixed={fixed}
      placeX={placeX}
      placeY={placeY}
      htmlFor="darkId"
    >
      <Switch.Input
        id="darkId"
        checked={isDarkTheme}
        onChange={handleTheme}
        type="checkbox"
      />
      <Switch.Slider>
        {!isDarkTheme ? (
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
