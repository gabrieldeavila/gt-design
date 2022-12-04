/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useState } from "react";
import { useGTPageStateContext } from "../../context/pageState";

function useInputValues(name: string) {
  const { pageState } = useGTPageStateContext();

  const [value, setValue] = useState(pageState[name] || "");
  const [labelIsUp, setLabelIsUp] = useState(!!pageState[name]);

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
