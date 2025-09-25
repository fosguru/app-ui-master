import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useCookie } from '#imports'

export const useOrganizationsStore = defineStore('organizations', {
  state: () => ({
    loading: false,
    loadingOne: false,
    updating: false,
    loadingOperators: false,
    loadingMembers: false,
    updatingMember: false,

    organizations: [],
    organization: null,
    operators: null,
    members: null,
  }),

  actions: {
    async getFullOrganizationsData () {
      const promises = [this.getOrganizations()]

      const selectedId = useCookie('datachef-org').value
      if (selectedId) {
        promises.push(this.getOrganization(selectedId))
      }
      await Promise.all(promises)
      if (! selectedId) {
        await this.getOrganization(this.organizations[0].organization.uuid)
        useCookie('datachef-org', { path: '/', maxAge: (60 * 60 * 24 * 30) }).value = this.organizations[0].organization.uuid
      }
    },

    async getOrganizations () {
      this.loading = true
      const resp = await useApi('/organizations/')
      this.organizations = resp.results
      this.loading = false
    },

    async getOrganization (id) {
      this.loadingOne = true
      const res = await useApi(`/organizations/${id}/`)
      this.organization = res.results[0]
      this.loadingOne = false
    },

    async updateOrganization (id, form) {
      this.updating = true
      this.organization = await useApi(`/organizations/${id}/`, { method: 'PATCH', body: form })
      this.updating = false
    },

    async getOperators (id) {
      this.loadingOperators = true
      this.operators = await useApi(`/organizations/${id}/operators/`)
      this.loadingOperators = false
    },

    async getMembers (id) {
      this.loadingMembers = true
      this.members = await useApi(`/organizations/${id}/members/`)
      this.loadingMembers = false
    },

    async updateMember (id, memberId, form) {
      this.updatingMember = true
      const updated = await useApi(`/organizations/${id}/members/${memberId}/`, { method: 'PATCH', body: form })
      const idx = this.members.results.findIndex(m => m.uuid === updated.uuid)
      if (idx !== -1) { this.members.results[idx] = updated }
      this.updatingMember = false
    },
  },

  getters: {
    currentMemberId () {
      return this.organizations.find(o => o.organization.uuid === this.organization.uuid)?.uuid
    },
  },
})
