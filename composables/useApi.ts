import type { FetchOptions } from 'ofetch'
import { $fetch } from 'ofetch'
import merge from 'lodash/merge'
import qs from 'qs'
import useToast from './useToast'
import { showError, useRoute, useRuntimeConfig } from '#imports'
import { useAuthStore } from '~/stores/auth'

export async function useApi (url: string, options: FetchOptions = {}) {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const path = useRoute().path

  if (options.query) {
    url += `?${qs.stringify(options.query, {
     arrayFormat: 'brackets',
     filter: (prefix: any, value: any) => value !== null ? value : undefined,
   })}`
    delete options.query
  }

  try {
    return await $fetch(url, merge({
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
      },
    }, options))
  } catch (e: any) {
    // Show 404 error page on 404 API response
    if (e?.response?.status === 404) {
      showError({ statusCode: 404, message: e.message })
    }
    if (e?.response?.status === 401 && path !== '/login') {
      process.client && ((window as Window).location = '/logout')
      return // Don't throw, should just redirect app to /logout
    }
    if (e?.response?.status === 400) {
      useToast().addToast({ title: 'Error', text: 'There are some validation errors.', type: 'error' })
    }
    if (e?.response?.status === 500) {
      useToast().addToast({ title: 'Error', text: 'It looks like something broke. Sorry about that.', type: 'error' })
    }

    throw e
  }
}
