<template>
  <Collapse :header="tableName" @opened="loadColumns">
    <DataTable :headers="headers" :rows="columns" :loading="loading">
      <template #col-sync_status="{ cell }">
        <ToggleInput :model-value="cell === 'synced'" disabled />
      </template>
    </DataTable>
  </Collapse>
</template>

<script>
import { mapActions } from 'pinia'
import Collapse from '~/components/UI/Collapse.vue'
import DataTable from '~/components/UI/DataTable.vue'
import { useConnectionsStore } from '~/stores/connections'
import ToggleInput from '~/components/UI/ToggleInput.vue'

export default {
  components: { ToggleInput, DataTable, Collapse },

  props: {
    tableName: { type: String, required: true },
    connection: { type: Object, required: true },
  },

  data: () => ({
    headers: [
      { text: 'Field Label', value: 'label' },
      { text: 'Field Name', value: 'name' },
      { text: 'Type', value: 'data_type' },
      { text: 'Is Synced', value: 'sync_status' },
    ],

    loading: false,
    columns: [],
  }),

  methods: {
    ...mapActions(useConnectionsStore, ['getColumns']),

    async loadColumns () {
      this.loading = true
      const columns = await this.getColumns(this.connection, this.tableName)
      this.columns = columns
      this.loading = false
    },
  },
}
</script>
