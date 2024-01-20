// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      CONTENTFUL_SPACE_ID: process.env.NUXT_ENV_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCES_KEY: process.env.NUXT_ENV_CONTENTFUL_ACCES_KEY
    }
  },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
  ],
})