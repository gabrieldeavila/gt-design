/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
import * as Icon from "react-feather";
import { useTriggerState } from "react-trigger-state";
import Switch from "../Switch";

const initialTheme = () => {
  try {
    const firstTime = localStorage.getItem("firstTime") == null;

    return (
      localStorage?.getItem("darkTheme") === "1" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches && firstTime)
    );
  } catch (e) {
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
  const [isDarkTheme, setDarkTheme] = useTriggerState({
    name: "changedTheme",
    initial: initialTheme(),
  });

  const handleTheme = useCallback(() => {
    try {
      setDarkTheme((prev: boolean) => {
        if (!prev) {
          localStorage.setItem("darkTheme", "1");
        } else {
          localStorage.removeItem("darkTheme");
        }
        return !prev;
      });
    } catch (e) {
      console.log(e, "error");
    }
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
