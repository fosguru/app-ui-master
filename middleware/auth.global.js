import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'
import { useOrganizationsStore } from '~/stores/organization'

const exclude = ['/ui', '/login', '/logout']

/**
 * Logout middleware
 */
export default defineNuxtRouteMiddleware(async (to) => {
  if (exclude.find(ex => to.path.startsWith(ex))) {
    return
  }
  if (! useAuthStore().token) {
    return navigateTo('/login', { redirectCode: 302 })
  }

  const promises = []

  if (! useAuthStore().user) {
    promises.push(useAuthStore().getUser())
  }
  if (! useOrganizationsStore().organizations.length) {
    promises.push(useOrganizationsStore().getFullOrganizationsData())
  }

  if (promises.length) { await Promise.all(promises) }
})
