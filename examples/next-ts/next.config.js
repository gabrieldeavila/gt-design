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
  env: {
    NEXTAUTH_SECRET: "418e7368d466631156366e70543b1afd",
    GITHUB_ID: "75881469a3879160cd0f",
    GITHUB_SECRET: "719c30dad2ed9fc5b6a5fa95a580dbed4b741752",
    NEXTAUTH_URL: "http://localhost:3003",
    GOOGLE_ID:
      "77564033218-m82k3b31tmik1balumurle676j3620ii.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};

module.exports = nextConfig;
