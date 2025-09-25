import { useAuthStore } from '~/stores/auth'
import { defineNuxtPlugin, useCookie } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie('datachef-token').value
  if (token) {
    const authStore = useAuthStore(nuxtApp.$pinia)
    authStore.token = token
  }
})
