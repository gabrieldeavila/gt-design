import React, { ReactElement, useCallback, useState } from "react";
import { IGTInputSelect } from "../../components/Input/Fields/interface";
import { IPageStateValues } from "../../context/interface";
import GTPageStateProvider from "../../context/pageState";

function useEasyState({ starterState }: { starterState: IPageStateValues }) {
  const [pageState, setPageState] = useState<IPageStateValues>(starterState);
  const [errors, setErrors] = useState<string[]>([]);

  const Generator = useCallback(
    ({ children }: { children: ReactElement<IGTInputSelect> }) => {
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
    },
    [errors, pageState]
  );

  return {
    Generator,
    pageState,
    setPageState,
    errors,
    setErrors,
  };
}

export default useEasyState;
