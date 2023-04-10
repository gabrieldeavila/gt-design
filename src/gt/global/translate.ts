import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTriggerState } from "react-trigger-state";

function useGTTranslate() {
  const { t } = useTranslation();
  const [customTranslator] =
    useTriggerState({ name: "custom_translator" }) ?? false;

  const translateThis = useCallback(
    (key: string, params?: any) => {
      if (customTranslator != null) {
        const customT = customTranslator;
        return customT?.(key, params);
      }

      return t(key, params);
    },
    [customTranslator, t]
  );

  return { translateThis };
}

export default useGTTranslate;
