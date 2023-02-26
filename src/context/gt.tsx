import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";
import { IGTContext } from "./interface";

// create default values for context
const defaultValues = {
  darkTheme: false,
  setDarkTheme: () => {},
  children: null,
};

const GTContext = createContext<IGTContext | undefined>(defaultValues);

export function useGTContext() {
  const context = useContext(GTContext);
  if (context === undefined) {
    throw new Error("useGTContext must be within GTProvider");
  }

  return context;
}

function GTProvider({ darkTheme, setDarkTheme, children }: IGTContext) {
  const values = useMemo(
    () => ({
      darkTheme,
      setDarkTheme,
    }),
    [darkTheme, setDarkTheme]
  );

  return <GTContext.Provider value={values}>{children}</GTContext.Provider>;
}

export default GTProvider;

GTProvider.propTypes = {
  children: PropTypes.node.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  setDarkTheme: PropTypes.func.isRequired,
};
