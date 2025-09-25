import { defineNuxtPlugin } from 'nuxt/app'
import useToast from '~/composables/useToast'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      notify: useToast().addToast,
    },
  }
})
