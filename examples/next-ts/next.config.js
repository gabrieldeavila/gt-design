/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

module.exports = nextConfig;
