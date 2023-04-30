import "server-only";

import type { Locale } from "./i18n-config";

interface Dictionary {
  [key: string]: () => Promise<Record<any, any>>;
}

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: Dictionary = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  "en-US": () =>
    import("@/dictionaries/en.json").then((module) => module.default),
  "pt-BR": () =>
    import("@/dictionaries/pt-BR.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
