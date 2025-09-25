import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useOrganizationsStore } from '~/stores/organization'

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    loadingSubscriptions: true,
    loadingPrices: true,
    loadingSession: false,
    loadingCheckout: false,
    subscriptions: null,
    prices: null,
  }),

  actions: {
    async getSubscriptions () {
      this.loadingSubscriptions = true
      this.subscriptions = await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/stripe_subscription/`)
      this.loadingSubscriptions = false
    },

    async getPrices () {
      this.loadingPrices = true
      this.prices = await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/stripe_prices/`)
      this.loadingPrices = false
    },

    async getSessionUrl () {
      this.loadingSession = true
      const res = await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/stripe_customer_session/`, { method: 'POST' })
      this.loadingSession = false
      return res.url
    },

    async getCheckoutUrl (priceId) {
      this.loadingCheckout = true
      const res = await useApi(`/organizations/${useOrganizationsStore().organization.uuid}/stripe_checkout_session/${priceId}/`, { method: 'POST' })
      this.loadingCheckout = false
      return res.url
    },
  },
})
