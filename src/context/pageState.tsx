import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo, useState } from "react";
import { IGTPageState } from "./interface";

// create default values for context
const defaultValues = {
  errors: [],
  setErrors: () => { },
  pageState: {},
  setPageState: () => { },
  children: null,
};

const GTPageStateContext = createContext<IGTPageState | undefined>(defaultValues);

export function useGTPageStateContext() {
  const context = useContext(GTPageStateContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be within GTProvider");
  }

  return context;
}

function GTPageStateProvider({ errors, setErrors, pageState, setPageState, children, isLoading }: IGTPageState) {
  const [canSave, setCanSave] = useState(false);

  const values = useMemo(
    () => ({
      pageState,
      setPageState,
      canSave,
      setCanSave,
      errors,
      setErrors,
      isLoading,
    }),
    [canSave, errors, isLoading, pageState, setErrors, setPageState]
  );

  return <GTPageStateContext.Provider value={values}>{children}</GTPageStateContext.Provider>;
}

export default GTPageStateProvider;

GTPageStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  setErrors: PropTypes.func.isRequired,
  pageState: PropTypes.objectOf(PropTypes.string).isRequired,
  setPageState: PropTypes.func.isRequired
};
