<template>
  <Layout :crumbs="[{ label: 'Activity' }]">
    <DataTable :rows="actions" :loading="loading" :headers="headers" class="mb-10">
      <template #col-created="{ cell }">
        {{ $f.date(cell) }}
      </template>
      <template #col-actions="{ row }">
        <div class="flex justify-end gap-2">
          <Btn size="icon-sm" color="gray" :to="`/settings/merge-accounts/${row.uuid}`">
            <PhEye class="size-4" weight="bold" />
          </Btn>
        </div>
      </template>
    </DataTable>
  </Layout>
</template>

<script>
import { mapState } from 'pinia'
import { PhEye } from '@phosphor-icons/vue'
import Btn from '~/components/UI/Btn.vue'
import Layout from '~/components/Layout/Layout.vue'
import DataTable from '~/components/UI/DataTable.vue'
import { useActionsStore } from '~/stores/actions'

export default {
  components: { PhEye, DataTable, Layout, Btn },

  data: () => ({
    headers: [
      { text: 'Date & Time', value: 'created' },
      { text: 'Recipe', value: 'recipe' },
      { text: 'Connector', value: 'connector' },
      { text: 'Actions', value: 'connector' },
      { text: 'Approval Type', value: 'connector' },
      { text: 'Provided by', value: 'connector' },
      { text: 'Status', value: 'action_status' },
      { text: '', value: 'actions' },
    ],
  }),

  computed: {
    ...mapState(useActionsStore, ['loading', 'actions']),
  },

  mounted () {
    useActionsStore().getActions(this.$route.params.id)
  },
}
</script>
