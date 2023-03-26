/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useTriggerState } from "react-trigger-state";
import GTPageStateProvider from "../../context/pageState";
import { IGTEasyState } from "./interface";

const GTEasyState = ({ children, initial, name }: IGTEasyState) => {
  const [pageState, setPageState] = useTriggerState({
    name,
    initial: initial ?? {},
  });

  const [errors, setErrors] = useTriggerState({
    name: `${name}_errors`,
    initial: [],
  });

  const [canSave, setCanSave] = useTriggerState({
    name: `${name}_can_save`,
    initial: errors.length === 0,
  });

  // ideal would to be able to have a trigger to useMemo
  // TODO: react-trigger-state: add useMemoTriggerState
  useEffect(() => {
    setTimeout(() => {
      setCanSave(errors.length === 0);
    });
  }, [errors.length, setCanSave]);

  useEffect(() => {
    console.log(canSave, window.REACT_TRIGGER_STATE);
  }, [canSave]);

  return (
    <GTPageStateProvider
      errors={errors}
      setErrors={setErrors}
      pageState={pageState}
      setPageState={setPageState}
    >
      {children}
    </GTPageStateProvider>
  );
};

GTEasyState.displayName = "GTEasyState";

export default GTEasyState;
