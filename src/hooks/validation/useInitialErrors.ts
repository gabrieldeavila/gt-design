/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback } from "react";
import { useGTPageStateContextSetters } from "../../context/pageState";

/**
 * It mainly handles the initial errors, both in the initial render and when the values is cleared
 * @param name - the name of the input
 * @param inputValidations - the validations of the input
 * @returns handleInitialErrors - a function that handles the initial errors
 */
function useInitialErrors({
  name,
  inputValidations,
}: {
  name: string;
  inputValidations?: string[];
}) {
  const { setErrors } = useGTPageStateContextSetters();

  /**
   * Function that actually handles the initial errors, only if a value is required
   * @param inputVal - the value of the input
   * @returns if the value is valid or not
   */
  const handleInitialErrors = useCallback(
    async (inputVal: string | number) => {
      let isValid = true;
      if (!inputValidations) return isValid;

      if (inputValidations.includes("required")) {
        await setErrors((prevErrors) => {
          // the value exists, so it should not be in the errors obj
          if (inputVal) {
            const newState = prevErrors.filter((error) => error !== name);
            return newState;
          }

          isValid = false;

          // if it already has a value, don't add a repeated key
          if (prevErrors.includes(name)) {
            return prevErrors;
          }

          // if it doesn't have a value, add it to the errors obj
          const newState = [...prevErrors, name];
          return newState;
        });
      }

      return isValid;
    },
    [inputValidations, name, setErrors]
  );

  return {
    handleInitialErrors,
  };
}

export default useInitialErrors;
