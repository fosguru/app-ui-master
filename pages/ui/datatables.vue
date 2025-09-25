<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Data tables
      </div>
      <DataTable
        v-model:checked="checked"
        :rows="rows"
        :headers="headers"
        checkboxes
        sortable
        @sorted="s => rows = s"
      >
        <template #col-img>
          <div class="flex size-10 items-center justify-center rounded border border-gray-300 bg-gray-200">
            <PhotographIcon class="size-4 text-gray-400" />
          </div>
        </template>
        <template #col-price="{ cell }">
          <span class="text-gray-500">{{ $f.amount(cell) }}</span>
        </template>
        <template #col-availability="{ cell }">
          <ToggleInput :model-value="cell" />
        </template>
        <template #col-tags="{ cell }">
          <div class="flex flex-wrap gap-2">
            <Badge v-for="tag in cell" :key="tag" size="lg" class="bg-blue-500 text-white">
              {{ tag }}
            </Badge>
          </div>
        </template>
        <template #col-actions>
          <div class="-my-1 text-right">
            <Btn>Edit</Btn>
          </div>
        </template>
      </DataTable>
    </div>

    <MassActionsPanel :checked="checked" @clear="checked = []" />
  </div>
</template>

<script>
import DataTable from '~/components/UI/DataTable.vue'
import PhotographIcon from '~/components/Icons/PhotographIcon.vue'
import ToggleInput from '~/components/UI/ToggleInput.vue'
import Badge from '~/components/UI/Badge.vue'
import MassActionsPanel from '~/components/UI/MassActionsPanel.vue'
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn, MassActionsPanel, Badge, ToggleInput, PhotographIcon, DataTable },

  data: () => ({
    headers: [
      { text: 'Img', value: 'img', class: 'w-10', innerClass: '!pr-0' },
      { text: 'Name', value: 'name' }, { text: 'Price', name: 'price', value: 'pricing.base' },
      { text: 'Internal Tags', value: 'tags' },
      { text: 'Availability', name: 'availability', value: 'availability.available' },
      { text: '', value: 'actions' },
    ],

    rows: [
      { uuid: '98d4af49-8d15-4154-8d3e-18aa07b69944', name: 'test', tags: ['tag1', 'tag2'], image: null, pricing: { base: { amount: 123, currency: 'SGD' } }, availability: { available: true }, created_at: '2023-04-01T23:40:13Z' },
      { uuid: '98d4af49-8d15-4154-8d3e-18aa07b69945', name: 'test 2', tags: ['tag1'], image: null, pricing: { base: { amount: 234, currency: 'SGD' } }, availability: { available: true }, created_at: '2023-04-01T23:40:13Z' },
      { uuid: '98d4af49-8d15-4154-8d3e-18aa07b69946', name: 'test 3', tags: ['tag1', 'tag2'], image: null, pricing: { base: { amount: 345, currency: 'SGD' } }, availability: { available: false }, created_at: '2023-04-01T23:40:13Z' },
    ],

    checked: [],
  }),
}
</script>
