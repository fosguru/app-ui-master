import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === 'production') { return }

  nuxtApp.$pinia.use(({ store }) => {
    store.$onAction(({ name, after, onError }) => {
      const startTime = Date.now()
      // eslint-disable-next-line no-console
      console.log(`🍍 Started: \`${store.$id}.${name}\``)

      after(() => {
        // eslint-disable-next-line no-console
        console.log(`🍍 Finished \`${store.$id}.${name}\` after ${Date.now() - startTime}ms.`)
      })

      onError((error) => {
        console.warn(`🍍 Failed \`${store.$id}.${name}\` after ${Date.now() - startTime}ms.\nError: ${error}.`)
      })
    })
  })
})
