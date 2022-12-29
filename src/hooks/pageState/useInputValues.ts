/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useState } from "react";
import { useGTPageStateContextSetters } from "../../context/pageState";

function useInputValues(name: string) {
  const { pageStateRef } = useGTPageStateContextSetters();

  const [value, setValue] = useState(pageStateRef?.current?.[name] ?? "");
  const [labelIsUp, setLabelIsUp] = useState(!!pageStateRef?.current?.[name]);

  const handleInputFocus = useCallback(() => {
    setLabelIsUp(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (_.isEmpty(value)) {
      setLabelIsUp(false);
    }
  }, [value]);

  // if has value, label is up
  const handleInputChange = useCallback(
    (val: string) => {
      if (!_.isEmpty(val) && _.isEmpty(value)) {
        setLabelIsUp(true);
      }
      setValue(val);
    },
    [value]
  );

  return {
    labelIsUp,
    value,
    setValue,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
  };
}

export default useInputValues;
