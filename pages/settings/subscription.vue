<template>
  <Layout
    :crumbs="[{ label: 'Settings', to: '/settings' }, { label: 'Subscription' }]"
    :loading="loadingSubscriptions || loadingPrices"
  >
    <!--    <Alert v-model="showAlert" class="mb-4 bg-orange-400">
      You have used 2,349 of 5,000 (47%) free recommendations this month.
    </Alert> -->

    <Panel class="mb-10">
      <div class="flex flex-wrap items-center gap-4 text-xl dark:text-stone-200 max-sm:justify-center">
        <div>
          Your current plan:
          <span class="font-bold">{{ currentSubscription?.plan?.product?.name || 'Free' }}</span>
        </div>
        <div class="font-bold md:ml-10">
          {{ $f.currency((currentSubscription?.items?.data?.[0]?.price.unit_amount || 0) / 100, 0) }}/{{ currentSubscription?.plan?.interval || 'month' }}
        </div>
        <Btn color="gray" class="md:ml-20" :loading="loadingSession" @click="manageBilling">
          <PhCreditCard class="w-4- h-4" />
          Manage billing information
        </Btn>
      </div>
    </Panel>

    <div v-if="!currentSubscription">
      <div class="mb-6 flex flex-wrap items-center gap-3 max-sm:justify-center">
        <div class="text-xl font-semibold leading-loose text-stone-900 dark:text-stone-200">
          Subscription Options
        </div>
        <SegmentSelect v-model="interval" :options="{ month: 'Monthly Price', year: 'Yearly Price' }" />
      </div>

      <div class="grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
        <SubscriptionPanel
          v-for="price in filteredPrices"
          :key="price.id"
          :price="$f.currency(price.unit_amount / 100, 0)"
          :per="interval"
          :description="price.product.description"
          :name="price.product.name"
          :features="price.product.features.map(f => f.name)"
          :loading="clickedPrice === price"
          @click="checkout(price)"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { PhCreditCard } from '@phosphor-icons/vue'
import Layout from '~/components/Layout/Layout.vue'
import SubscriptionPanel from '~/components/Settings/SubscriptionPanel.vue'
import { useHead, useRuntimeConfig } from '#imports'
import SegmentSelect from '~/components/UI/SegmentSelect.vue'
import { usePaymentsStore } from '~/stores/payments'
import Panel from '~/components/UI/Panel.vue'
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { PhCreditCard, Btn, Panel, SegmentSelect, SubscriptionPanel, Layout },

  setup () {
    useHead({
      title: `Subscription | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    showAlert: true,
    interval: 'month',
    clickedPrice: null,
  }),

  computed: {
    ...mapState(usePaymentsStore, ['prices', 'subscriptions', 'loadingPrices', 'loadingSubscriptions', 'loadingSession']),

    filteredPrices () {
      return this.prices?.data?.filter(d => d.recurring?.interval === this.interval)
    },

    currentSubscription () {
      return this.subscriptions.data?.[0]
    },
  },

  mounted () {
    this.getPrices()
    this.getSubscriptions()
  },

  methods: {
    ...mapActions(usePaymentsStore, ['getPrices', 'getSubscriptions', 'getSessionUrl', 'getCheckoutUrl']),

    async manageBilling () {
      const winRef = window.open('about:blank', '_blank')
      winRef.location = await this.getSessionUrl()
    },

    async checkout (price) {
      this.clickedPrice = price
      const winRef = window.open('about:blank', '_blank')
      winRef.location = await this.getCheckoutUrl(price.id)
      this.clickedPrice = null
    },
  },
}
</script>
