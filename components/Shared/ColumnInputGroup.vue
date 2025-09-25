<template>
  <div class="grid gap-2" :class="isReference ? 'grid-cols-2' : 'grid-cols-1'">
    <Multiselect
      v-model="mainValue"
      class="w-full"
      :options="mainColumnsOptions"
      :taggable="allowCustom"
      :disabled="disabled"
      :multiple="!isReference"
    />
    <Multiselect
      v-if="isReference"
      v-model="refValue"
      class="w-full"
      :options="refColumnsOptions"
      :taggable="allowCustom"
      :disabled="disabled"
      :multiple="false"
      :loading="loadingColumns"
    />
  </div>
</template>

<script>
import merge from 'lodash/merge'
import capitalize from 'lodash/capitalize'
import { mapState } from 'pinia'
import Multiselect from '~/components/UI/Multiselect.vue'
import { useApi } from '~/composables/useApi'
import { useRecipesStore } from '~/stores/recipes'
import { useOrganizationsStore } from '~/stores/organization'

export const refRegex = /(?<tbl>\w+)\.(?<refTbl>\w+)\[(?<col>\w+)].(?<refCol>\w+)/

export default {
  components: { Multiselect },

  props: {
    modelValue: { type: Array, required: true },
    columns: { type: Array, required: true },
    multiple: { type: Boolean, default: true },
    allowCustom: Boolean,
    disabled: Boolean,
    noReference: Boolean,
  },

  emits: ['update:modelValue', 'selectedRefColData'],

  data: () => ({
    loadingColumns: false,
    refColumns: [],
  }),

  computed: {
    ...mapState(useOrganizationsStore, ['organization']),
    ...mapState(useRecipesStore, ['recipe']),

    isValueReference () {
      return refRegex.test(this.modelValue[0])
    },

    isReference () {
      return ! this.noReference && (this.isValueReference || this.firstSelected?.data_type === 'reference')
    },

    firstSelected () {
      if (this.isValueReference) {
        const main = this.parsedValue.main
        return this.columns.find(c => `${c.table_name}.${c.name}` === main) || null
      }
      return this.modelValue?.length ? this.columns.find(c => `${c.table_name}.${c.name}` === this.modelValue[0]) : null
    },

    selectedRefColData () {
      const groups = this.parsedRefValue
      if (! groups) { return null }
      return this.refColumns.find(c => `${c.table_name}.${c.name}` === `${groups.tbl}.${groups.col}`)
    },

    parsedValue () {
      if (! this.isValueReference) {
        return { main: this.modelValue[0], ref: null }
      }
      const { groups } = refRegex.exec(this.modelValue[0])

      return {
        main: `${groups.tbl}.${groups.col}`,
        ref: `${groups.refTbl}.${groups.refCol}`,
      }
    },

    mainValue: {
      get () {
        if (this.isReference) {
          return this.parsedValue.main
        } else {
          return merge([], this.modelValue)
        }
      },

      set (val) {
        if (this.isReference) {
          this.updateValue(val, this.refValue)
        } else {
          this.$emit('update:modelValue', val)
        }
      },
    },

    refValue: {
      get () { return this.parsedValue.ref },
      set (val) { this.updateValue(this.mainValue, val) },
    },

    parsedRefValue () {
      const matches = /(?<tbl>\w+)\.(?<col>\w+)/.exec(this.parsedValue.ref)

      return matches?.groups
    },

    mainColumnsOptions () {
      if (! this.columns) { return {} }
      const firstSelected = this.firstSelected
      let columns = this.columns
      if (firstSelected) { // Filter by first selected column data_type
        columns = this.columns.filter(c => c.data_type === firstSelected.data_type)
      }

      return columns.reduce((acc, c) => {
        if (c.aggregate) {
          acc[c.name] = c.name
        } else {
          const key = `${c.table_name}.${c.name}`
          const displayValue = this.formatColumnDisplay(c)
          acc[key] = displayValue
        }
        return acc
      }, {})
    },

    refColumnsOptions () {
      if (! this.refColumns.length) { return {} }

      return this.refColumns.reduce((acc, c) => {
        const key = `${c.table_name}.${c.name}`
        const displayValue = this.formatColumnDisplay(c)
        acc[key] = displayValue
        return acc
      }, {})
    },
  },

  watch: {
    isReference () {
      this.loadRefColumns()
    },

    mainValue () {
      this.loadRefColumns()
    },

    refValue () {
      this.$emit('selectedRefColData', this.selectedRefColData)
    },

    refColumns () {
      this.$emit('selectedRefColData', this.selectedRefColData)
    },
  },

  mounted () {
    this.loadRefColumns()
  },

  methods: {
    updateValue (main, ref = null) {
      if (! main) {
        return this.$emit('update:modelValue', [])
      }
      const [tbl, col] = main.split('.')
      if (ref) {
        const [refTbl, refCol] = ref.split('.')
        this.$emit('update:modelValue', [`${tbl}.${refTbl}[${col}].${refCol}`])
      } else {
        this.$emit('update:modelValue', [main])
      }
    },

    formatColumnDisplay (column) {
      // Format as: [Table Name] Field Label (field_name)
      const tableName = capitalize(column.table_name)
      const fieldLabel = column.label || column.name
      const fieldName = column.name

      return `${tableName} → ${fieldLabel} (${fieldName})`
    },

    async loadRefColumns () {
      if (! this.isReference || ! this.firstSelected || ! this.firstSelected.reference_to.length) { return }
      this.loadingColumns = true
      this.refColumns = []
      const resp = await useApi(`/organizations/${this.organization.uuid}/connections/${this.recipe.connection.uuid}/columns/`, {
        query: { limit: 99999, table_name: this.firstSelected.reference_to.join(','), sync_status: 'synced' },
      })
      this.refColumns = resp.results
      this.loadingColumns = false
    },
  },
}
</script>
