// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  components: [
    {
      path: '~/components',
      extensions: ['vue', 'ts'],

    },
  ],

  app: {
    head: {
      title: 'Forsit Ecommerce Dashboard',
      meta: [
        { name: 'description', content: 'Forsit Ecommerce Dashboard' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        ,
      ]
    }
  },
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', 'shadcn-nuxt', '@nuxt/fonts'],
  fonts: {
    families: [{ name: 'Outfit', src: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap", provider: 'google' },]
  },
  shadcn: {
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'

  },
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/firebase.js'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})
