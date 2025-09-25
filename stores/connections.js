import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useOrganizationsStore } from '~/stores/organization'

export const useConnectionsStore = defineStore('connections', {
  state: () => ({
    loading: true,
    loadingMeta: true,
    loadingColumns: true,
    creating: false,
    updating: false,
    deleting: false,
    connections: [],
    connection: null,
    columns: null,
  }),

  actions: {
    async getConnections () {
      this.loading = true
      const resp = await useApi(`/connections/${this.orgId}/`)
      this.connections = resp.results
      this.loading = false
    },

    async getConnection (id) {
      this.loading = true
      this.connection = await useApi(`/connections/${this.orgId}/${id}/`)
      this.loading = false
    },

    async getColumns (connection, primaryTable) {
      this.loadingColumns = true
      const params = new URLSearchParams({
        hidden_fields: 'false',
      })
      if (primaryTable) {
        if (Array.isArray(primaryTable)) {
          primaryTable.forEach(table => params.append('table_name', table))
        } else {
          params.append('table_name', primaryTable)
        }
      }
      const resp = await useApi(`/connections/${this.orgId}/${connection.uuid}/columns/?${params}`)
      this.columns = resp.results
      this.loadingColumns = false
      return resp.results
    },

    // TODO FIXME -- update this; blocked by Django work...
    async createConnection (form) {
      this.creating = true
      try {
        await useApi(`/connections/${this.orgId}/`, { method: 'POST', body: form })
      } finally {
        this.creating = false
      }
    },

    async updateConnection (id, form) {
      this.updating = true
      try {
        await useApi(`/connections/${this.orgId}/connections/${id}/`, { method: 'PATCH', body: form })
      } finally {
        this.updating = false
      }
    },

    async deleteConnection (id) {
      this.deleting = true
      try {
        await useApi(`/connections/${this.orgId}/${id}/`, { method: 'DELETE' })
      } finally {
        this.deleting = false
      }
    },
  },

  getters: {
    orgId () {
      return useOrganizationsStore().organization.uuid
    },
  },
})
