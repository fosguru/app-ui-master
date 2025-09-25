<template>
  <Modal :model-value="modelValue" content-class="max-w-lg" @update:model-value="v => $emit('update:modelValue', v)">
    <div class="p-6">
      <div class="mb-4 text-lg">
        Filters
      </div>
      <div class="mb-6 space-y-4">
        <DropdownSelect
          v-model="filters.connection_uuid"
          label="Connection"
          :options="connections.reduce((acc, con) => ((acc[con.uuid] = con.name), acc), {})"
          :loading="loadingConections"
        />
        <DropdownSelect
          v-model="filters.automation"
          label="Automation"
          :options="{ queue: 'Queue', automatic: 'Automatic', deactivated: 'Deactivated' }"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Btn color="white" @click="clearFilters">
          Clear
        </Btn>
        <Btn @click="$emit('apply', filters), $emit('update:modelValue', false)">
          Apply
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import merge from 'lodash/merge'
import Btn from '~/components/UI/Btn.vue'
import DropdownSelect from '~/components/UI/DropdownSelect.vue'
import Modal from '~/components/UI/Modal.vue'

const baseFilters = {
  connection_uuid: [],
  automation: [],
}

export default {
  components: { Modal, DropdownSelect, Btn },

  props: {
    modelValue: { type: Boolean, required: true },
    connections: { type: Array, required: true },
    params: { type: Object, required: true },
    loadingConections: Boolean,
  },

  emits: ['apply', 'update:modelValue', 'clear'],

  data: () => ({
    filters: merge({}, baseFilters),
  }),

  watch: {
    modelValue (val) {
      if (val) {
        this.filters = merge({}, baseFilters, this.params)
      }
    },
  },

  methods: {
    clearFilters () {
      this.$emit('clear')
      this.filters = merge({}, baseFilters, this.params)
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
