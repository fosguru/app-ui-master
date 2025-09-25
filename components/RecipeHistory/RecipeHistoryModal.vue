<template>
  <Modal :model-value="modelValue" content-class="max-w-2xl" @update:model-value="$emit('update:modelValue', false)">
    <div class="p-6 text-lg">
      Version History
    </div>

    <DataTable :rows="history.results" :headers="headers" :loading="loadingHistory">
      <template #col-history_date="{ cell }">
        {{ $f.date(cell) }}
      </template>
      <template #col-actions="{ row }">
        <span v-if="row.last_updated === recipe.last_updated">Current version</span>
        <Btn v-else color="white" size="xs" :to="`/recipes/${row.uuid}?history_id=${row.pk}`">
          View
        </Btn>
      </template>
    </DataTable>

    <div class="px-6 py-4">
      <Pagination :total="history.count" :limit="limit" :offset="offset" :loading="loadingHistory" @change="loadHistory" />
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Modal from '@/components/UI/Modal'
import { useRecipesStore } from '~/stores/recipes'
import DataTable from '~/components/UI/DataTable.vue'
import Pagination from '~/components/UI/Pagination.vue'
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn, Pagination, DataTable, Modal },

  props: {
    modelValue: Boolean,
    recipe: { type: Object, required: true },
  },

  emits: ['update:modelValue'],

  data: () => ({
    limit: 100,
    offset: 0,
    headers: [
      { text: 'Date', value: 'history_date' },
      { text: 'Changed By', value: 'changed_by' },
      { text: '', value: 'actions' },
    ],
  }),

  computed: {
    ...mapState(useRecipesStore, ['history', 'loadingHistory']),
  },

  watch: {
    modelValue (val) {
      if (val) { this.loadHistory() }
    },
  },

  methods: {
    ...mapActions(useRecipesStore, ['getHistory']),

    async loadHistory (page = 1) {
      this.offset = this.limit * (page - 1)
      await this.getHistory(this.recipe.uuid, this.limit, this.offset)
    },
  },
}
</script>
