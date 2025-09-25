import { defineNuxtPlugin } from 'nuxt/app'
import omit from 'lodash/omit'
import pick from 'lodash/pick'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pick,
      omit,
    },
  }
})
