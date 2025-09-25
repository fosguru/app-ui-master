<template>
  <Layout :crumbs="[{ label: 'Connections', to: '/connections' }, { label: 'Synced Tables and Fields' }]" :loading="loading">
    <div v-if="connection?.table_names" class="space-y-4">
      <SyncedFieldPanel v-for="table in connection.table_names" :key="table" :connection="connection" :table-name="table" />
    </div>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Layout from '~/components/Layout/Layout.vue'
import { useConnectionsStore } from '~/stores/connections'
import SyncedFieldPanel from '~/components/Connections/SyncedFieldPanel.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { SyncedFieldPanel, Layout },

  setup () {
    useHead({
      title: `Synced Fields | ${useRuntimeConfig().public.appName}`,
    })
  },

  computed: {
    ...mapState(useConnectionsStore, ['connection', 'loading']),
  },

  async mounted () {
    await this.getConnection(this.$route.params.id)
  },

  methods: {
    ...mapActions(useConnectionsStore, ['getConnection', 'getColumns']),
  },
}
</script>
