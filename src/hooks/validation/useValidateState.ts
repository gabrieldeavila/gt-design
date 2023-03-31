/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useGTPageStateContextSetters } from "../../context/pageState";
import { TValidateState } from "./interface";
import useInitialErrors from "./useInitialErrors";

function useValidateState(name: string, inputValidations: string[]) {
  const { setPageState, setErrors } = useGTPageStateContextSetters();
  const { handleInitialErrors } = useInitialErrors({ name, inputValidations });

  useEffect(() => {
    async function setData() {
      let inputVal: string | number = "";
      let newState = {};

      await setPageState((prevState) => {
        // if already has a value, keep it
        const prevVal = prevState[name] ?? "";
        if (_.isBoolean(prevVal)) {
          inputVal = prevVal.toString();
        } else {
          inputVal = prevVal;
        }

        // add a key to the obj
        newState = { ...prevState, [name]: prevVal };
        return prevState;
      });

      setPageState(newState);
      console.log(inputVal);
      // validate the initial value
      void handleInitialErrors(inputVal);
    }

    setData().catch((err) => {
      console.error(err);
    });
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
