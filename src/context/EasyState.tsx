import React, { createContext, useMemo, useState } from "react";
import { IEasyState, IGTEasyState, IPageStateValues } from "./interface";
import GTPageStateProvider from "./pageState";

// create default values for context
const defaultValues = {
  pageState: {},
  setPageState: () => {},
  errors: [],
  setErrors: () => {},
  children: null,
};

const GTEasyStateContext = createContext<IGTEasyState | undefined>(
  defaultValues
);

function EasyState({ children, starterState }: IEasyState) {
  const [pageState, setPageState] = useState<IPageStateValues>(starterState);
  const [errors, setErrors] = useState<string[]>([]);

  const values = useMemo(
    () => ({
      pageState,
      setPageState,
      errors,
      setErrors,
    }),
    [errors, pageState]
  );

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
}

export default EasyState;
