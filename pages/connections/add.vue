<template>
  <Layout :crumbs="[{ label: 'Connections', to: '/connections' }, { label: 'Add' }]">
    <div class="mb-6 text-xl font-semibold text-stone-900">
      Let's connect your data
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <AddSalesforceCrm />
      <AddSalesforceCrmSandbox />
    </div>
  </Layout>
</template>

<script>
import Layout from '~/components/Layout/Layout.vue'
import AddSalesforceCrm from '~/components/Connections/AddSalesforceCrm.vue'
import AddSalesforceCrmSandbox from '~/components/Connections/AddSalesforceCrmSandbox.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: {
    AddSalesforceCrm,
    AddSalesforceCrmSandbox,
    Layout,
  },

  setup () {
    useHead({
      title: `Add Connection | ${useRuntimeConfig().public.appName}`,
    })
  },
}
</script>
