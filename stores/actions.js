import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useActionsStore = defineStore('actions', {
  state: () => ({
    loading: true,
    loadingAnalysis: true,
    actions: [],
    total: 0,
    analysis: {},
  }),

  actions: {
    async getActions (connectionId, status = 'PENDING', recipe = null, limit = 100, offset = 0) {
      this.loading = true
      const resp = await useApi(`/actions/${connectionId}/`, {
        query: { status, recipe_uuid: recipe, limit, offset },
      })
      this.actions = resp.actions
      this.total = resp.count
      this.loading = false
    },

    async updateActions (connectionId, body) {
      await useApi(`/actions/${connectionId}/`, { method: 'POST', body })
    },

    async getAnalysis (connectionId) {
      this.loadingAnalysis = true
      this.analysis = await useApi(`/actions/${connectionId}/analysis`)
      // this.total = resp.count
      this.loadingAnalysis = false
    },
  },
})
