import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IPageStateValues } from "../../context/interface";
import GTPageStateProvider from "../../context/pageState";
import { IGTEasyState } from "./interface";

const GTEasyState = forwardRef(({ children, starterState }: IGTEasyState, ref) => {
  const [pageState, setPageState] = useState<IPageStateValues>(starterState);
  const [errors, setErrors] = useState<string[]>([]);

  useImperativeHandle(
    ref,
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
});

GTEasyState.displayName = "GTEasyState";

export default GTEasyState;
