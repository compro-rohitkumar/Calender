export default defineNuxtConfig({
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
