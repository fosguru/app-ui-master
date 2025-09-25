import Emitter from 'tiny-emitter'
import { defineNuxtPlugin } from '#imports'

export const emitter = new Emitter()

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dialog: {
        show (params) {
          return new Promise((resolve) => {
            emitter.emit('show', params, resolve)
          })
        },
      },
    },
  }
})
