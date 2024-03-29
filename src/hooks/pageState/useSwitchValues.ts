/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { THandleSwitch } from "./interface";

function useSwitchValues(
  name: string,
  inputValidations?: string[],
  disabled?: boolean
) {
  const [showFeedback, setShowFeedback] = useState(false);
  const { setPageState } = useGTPageStateContextSetters();

  const { pageStateRef } = useGTPageStateContextSetters();

  const [value, setValue] = useState(pageStateRef?.current?.[name] ?? "");

  const isRequired = useMemo(
    () => inputValidations?.includes("required") && _.isEmpty(value.toString()),
    [inputValidations, value]
  );

  const handleInputChange: THandleSwitch = useCallback(
    (newVal: boolean) => {
      if (disabled ?? false) return;

      setPageState((prevState) => ({
        ...prevState,
        [name]: newVal,
      }));

      setValue(newVal);
    },
    [disabled, name, setPageState]
  );

  const handleMouseEnter = useCallback(() => {
    setShowFeedback(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowFeedback(false);
  }, []);

  return {
    isRequired,
    value,
    showFeedback,
    handleMouseEnter,
    handleMouseLeave,
    handleInputChange,
  };
}

export default useSwitchValues;
