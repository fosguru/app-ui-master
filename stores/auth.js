import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authLoading: false,
    userLoading: false,
    updating: false,
    token: null,
    user: null,
  }),

  actions: {
    async loginGoogle (data) {
      this.authLoading = true
      const resp = await useApi('/auth/google/', { method: 'post', body: { code: data.code } })
      this.setToken(resp.key)
      await this.getUser()
      this.authLoading = false
    },

    async loginMicrosoft (data) {
      this.authLoading = true
      const resp = await useApi('/auth/microsoft/', { method: 'post', body: { access_token: data.accessToken } })
      this.setToken(resp.key)
      this.authLoading = false
    },

    async getUser () {
      this.userLoading = true
      this.user = await useApi('/auth/user/')
      this.userLoading = false
    },

    async updateUser (form) {
      this.updating = true
      try {
        this.user = await useApi('/auth/user/', { method: 'PATCH', body: form })
      } finally {
        this.updating = false
      }
    },

    setToken (token) {
      this.token = token
      useCookie('datachef-token', { path: '/', maxAge: (60 * 60 * 24 * 30) }).value = this.token
    },

    logout () {
      this.token = null
      this.user = null
      useCookie('datachef-token').value = null
    },
  },
})
