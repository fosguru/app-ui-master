import { defineNuxtPlugin } from 'nuxt/app'
import { createClient } from 'contentful'
import { useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(() => {
  if (! useRuntimeConfig().public.contentful.accessToken) { return }
  return {
    provide: {
      contentful: createClient(useRuntimeConfig().public.contentful),
    },
  }
})
