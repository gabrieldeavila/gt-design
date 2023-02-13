/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useEffect } from "react";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "./interface";
import useInitialErrors from "./useInitialErrors";

function useValidateState(name: string, inputValidations: string[]) {
  const { setPageState, setErrors } = useGTPageStateContextSetters();
  const { handleInitialErrors } = useInitialErrors({ name, inputValidations });

  useEffect(() => {
    let inputVal: string | number = "";

    setPageState((prevState) => {
      // if already has a value, keep it
      const prevVal = prevState[name] ?? "";
      inputVal = prevVal;

      // add a key to the obj
      const newState = { ...prevState, [name]: prevVal };
      return newState;
    });

    // validate the initial value
    void handleInitialErrors(inputVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateState: TValidateState = useCallback(
    (isValid, value) => {
      setPageState((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (isValid) {
        setErrors((prevErrors) => {
          // if it doesn't have a key, don't remove it
          if (!prevErrors.includes(name)) {
            return prevErrors;
          }

          const newErrors = prevErrors.filter((error) => error !== name);
          return newErrors;
        });
      } else {
        setErrors((prevState) => {
          // if already has a value, don't add it
          if (prevState.includes(name)) {
            return prevState;
          }

          const newErrors = [...prevState, name];
          return newErrors;
        });
      }
    },
    [name, setErrors, setPageState]
  );

  return { validateState };
}

export default useValidateState;
