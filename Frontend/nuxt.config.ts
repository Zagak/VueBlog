// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      CONTENTFUL_SPACE_ID: process.env.NUXT_ENV_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCES_KEY: process.env.NUXT_ENV_CONTENTFUL_ACCES_KEY,
      SERVER_URI: process.env.NUXT_ENV_SERVER_URI,
    },
  },

  devServer: {
    port: 6058,
  },

  css: ["~/assets/css/main.css", "@fortawesome/fontawesome-free/css/all.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image", "@pinia/nuxt"],
});
