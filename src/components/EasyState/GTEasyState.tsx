import React, {
  forwardRef, useImperativeHandle,
  useState
} from "react";
import { useTriggerState } from "react-trigger-state";
import GTPageStateProvider from "../../context/pageState";
import { IGTEasyState } from "./interface";

const GTEasyState = forwardRef(
  ({ children, initial, name }: IGTEasyState, ref) => {
    const [pageState, setPageState] = useTriggerState({
      name: name ?? `page_state_${new Date().getTime()}`,
      initial: initial ?? {},
    });

    const [errors, setErrors] = useState<string[]>([]);

    useImperativeHandle(
      ref,
      () => ({
        pageState,
        setPageState,
        errors,
        setErrors,
      }),
      [errors, pageState, setPageState]
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
);

GTEasyState.displayName = "GTEasyState";

export default GTEasyState;
