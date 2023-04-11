import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { globalState } from "react-trigger-state";

function useGTTranslate() {
  const { t } = useTranslation();

  const translateThis = useCallback(
    (key: string, params?: any) => {
      const serverTranslation = globalState.get("server_translation");
      const prevTranslations = globalState.get("is_translated");
      const isTranslated = prevTranslations?.[key];

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
            [key]: serverTranslationKey,
          });
        }

        return serverTranslationKey ?? key;
      }

      return t(key, params);
    },
    [t]
  );

  return { translateThis };
}

export default useGTTranslate;
