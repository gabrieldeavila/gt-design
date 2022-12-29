import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IGTPageState,
  IGTPageStateSetters,
  IPageStateValues,
} from "./interface";

// create default values for context
const defaultValues = {
  errors: [],
  setErrors: () => {},
  pageState: {},
  setPageState: () => {},
  children: null,
};

const defaultValuesSetters = {
  setErrors: () => {},
  setPageState: () => {},
  isLoading: true,
  pageStateRef: { current: {} },
};

/**
 * 👨‍🚒 WHY TWO CONTEXTS? 👨‍🚒
 * Because if we use only one context, we will have to re-render the entire tree
 * every time we change a value. This is not good for performance.
 *
 * So, we use two contexts, one for the values and another for the setters.
 *
 * This way, we can use the values context in the components that need to read the values
 * and the setters context in the components that need to change the values.
 */

const GTPageStateContext = createContext<IGTPageState | undefined>(
  defaultValues
);

// prettier-ignore
const GTPageStateSettersContext = createContext<IGTPageStateSetters | undefined>(defaultValuesSetters);

export function useGTPageStateContext() {
  const context = useContext(GTPageStateContext);
  if (context === undefined) {
    throw new Error("useGTPageStateContext must be within GTProvider");
  }

  return context;
}

export function useGTPageStateContextSetters() {
  const context = useContext(GTPageStateSettersContext);
  if (context === undefined) {
    throw new Error("useGTPageStateContextSetters must be within GTProvider");
  }

  return context;
}

function GTPageStateProvider({
  errors,
  setErrors,
  pageState,
  setPageState,
  children,
  isLoading,
}: IGTPageState) {
  const [canSave, setCanSave] = useState(false);
  const pageStateRef = useRef<IPageStateValues>(pageState);

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

  useEffect(() => {
    pageStateRef.current = pageState;
  }, [pageState]);

  const valuesSetters = useMemo(() => {
    return { setErrors, setPageState, isLoading, pageStateRef };
  }, [isLoading, setErrors, setPageState]);

  return (
    <GTPageStateSettersContext.Provider value={valuesSetters}>
      <GTPageStateContext.Provider value={values}>
        {children}
      </GTPageStateContext.Provider>
    </GTPageStateSettersContext.Provider>
  );
}

export default GTPageStateProvider;

GTPageStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  setErrors: PropTypes.func.isRequired,
  pageState: PropTypes.objectOf(PropTypes.string).isRequired,
  setPageState: PropTypes.func.isRequired,
};
