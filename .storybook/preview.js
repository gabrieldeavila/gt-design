import { useEffect, Suspense } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../src/translate/index";

// Create a global variable called locale in storybook
// and add a dropdown in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "🇺🇸", title: "English" },
        { value: "pt-BR", right: "🇧🇷", title: "Português - BR" },
      ],
      showName: true,
    },
  },
};

// When The language changes, set the document direction
i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

// Wrap your stories in the I18nextProvider component
const i18nextStoryDecorator = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <>
      {/* adds default font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,600&family=Rubik+Bubbles&display=swap"
        rel="stylesheet"
      />

      <link
        rel="preload"
        href="/fonts/Mona-Sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="true"
      />

      {/* here catches the suspense from components not yet ready (still loading
      translations)
      alternative set useSuspense false on
      i18next.options.react when initializing i18next */}
      <Suspense fallback={<div>loading translations...</div>}>
        <Story />
        <I18nextProvider i18n={i18n}></I18nextProvider>
      </Suspense>
    </>
  );
};

// export decorators for storybook to wrap your stories in
export const decorators = [i18nextStoryDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
