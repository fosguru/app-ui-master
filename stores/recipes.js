import { defineStore } from 'pinia'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import { useApi } from '~/composables/useApi'
import { useOrganizationsStore } from '~/stores/organization'

const defaultParams = {
  automation: [],
  connection_uuid: [],
}

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    loading: true,
    loadingHistory: false,
    loadingHistoryItem: false,
    updating: false,
    params: merge({}, defaultParams),
    recipes: [],
    recipe: null,
    history: {
      results: [],
      count: 0,
    },
    historyItem: null,
  }),

  actions: {
    async getRecipes (params = {}) {
      this.params = { ...this.params, ...params }
      this.loading = true

      // Build query object conditionally to exclude empty parameters
      const query = {}
      if (this.params.automation.length > 0) {
        query.automation = this.params.automation.join(',')
      }
      if (this.params.connection_uuid.length > 0) {
        query.connection_uuid = this.params.connection_uuid.join(',')
      }

      const resp = await useApi(`/recipes/${useOrganizationsStore().organization.uuid}/`, {
        query,
      })
      this.recipes = resp.results
      this.loading = false
    },

    async getRecipe (id) {
      this.recipe = null
      this.loading = true
      this.recipe = await useApi(`/recipes/${useOrganizationsStore().organization.uuid}/${id}/`)
      this.loading = false
    },

    async updateRecipe (id, form) {
      this.updating = true
      try {
        this.recipe = await useApi(`/recipes/${useOrganizationsStore().organization.uuid}/${id}/`, { method: 'PATCH', body: form })
      } finally {
        this.updating = false
      }
    },

    async getHistory (id, limit = 100, offset = 0) {
      this.loadingHistory = true
      this.history = (await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/recipes/${id}/history/`, {
        options: { query: { limit, offset } },
      }))
      this.loadingHistory = false
    },

    async getHistoryItem (recipeId, historyId) {
      this.loadingHistoryItem = true
      this.historyItem = (await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/recipes/${recipeId}/history/${historyId}/`))
      this.loadingHistoryItem = false
    },

    clearParams () {
      this.params = merge({}, defaultParams)
    },
  },

  getters: {
    filtersApplied () {
      return ! isEqual(this.params, defaultParams)
    },
  },
})
