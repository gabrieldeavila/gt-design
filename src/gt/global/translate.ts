import { useCallback } from "react";
import { globalState } from "react-trigger-state";

function useGTTranslate() {
  const translateThis = useCallback((key: string, params?: any) => {
    const serverTranslation = globalState.get("server_translation");
    const prevTranslations = globalState.get("is_translated");
    const lang = globalState.get("lang");
    const isTranslated = prevTranslations?.[lang]?.[key];

    if (isTranslated != null) {
      return isTranslated;
    }

    if (serverTranslation != null) {
      // in the server, the key might be "KEY.key.key", so we need to split it
      const keyParts = key.split(".");

      let serverTranslationKey = serverTranslation;
      for (const keyPart of keyParts) {
        serverTranslationKey = serverTranslationKey?.[keyPart];
      }

      if (params != null) {
        Object.keys(params).forEach((key) => {
          serverTranslationKey = serverTranslationKey?.replace(
            `{{${key}}}`,
            params[key]
          );
        });
      }

      if (serverTranslationKey != null) {
        globalState.set("is_translated", {
          ...prevTranslations,
          [lang]: {
            ...prevTranslations?.[lang],
            [key]: serverTranslationKey,
          },
        });
      }

      return serverTranslationKey ?? key;
    }

    // return t(key, params)
    return key;
  }, []);

  return { translateThis };
}

export default useGTTranslate;
