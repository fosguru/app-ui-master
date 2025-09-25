<template>
  <div class="grid w-full grid-cols-3 gap-4">
    <slot name="prepend" />
    <ColumnInputGroup v-model="columnsValue" :no-reference="noReference" :columns="unusedColumns" :disabled="disabled" @selected-ref-col-data="d => selectedRefColumnData = d" />
    <OperatorInputGroup v-model="operatorValue" :type="operatorType" :data-type="dataType" :column-operators="columnOperators" :disabled="disabled" />
    <div>
      <PriorityListModal v-if="(operatorValue || '').toString().trim().toUpperCase() === 'PRESERVE_PRIORITY'" v-model="valuesValue" :disabled="disabled" />
      <ValueInputGroup
        v-else-if="!operatorData || operatorData.render_value_input"
        v-model="valuesValue"
        :data-type="dataType"
        :selected-columns-data="selectedColumnsData"
        :disabled="disabled"
        :operator="operatorValue"
      />
    </div>
  </div>
</template>

<script>
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import isNil from 'lodash/isNil'
import ValueInputGroup from '~/components/Shared/ValueInputGroup.vue'
import ColumnInputGroup from '~/components/Shared/ColumnInputGroup.vue'
import OperatorInputGroup from '~/components/Shared/OperatorInputGroup.vue'
import PriorityListModal from '~/components/Recipes/PriorityListModal.vue'

export default {
  components: { PriorityListModal, OperatorInputGroup, ColumnInputGroup, ValueInputGroup },

  props: {
    modelValue: { type: Object, required: true },
    columns: { type: Array, required: true },
    selectedColumns: { type: Array, default: null },
    operatorType: { type: String, default: 'condition' },
    disabled: Boolean,
    noReference: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    selectedRefColumnData: null,
  }),

  computed: {
    columnsValue: {
      get () { return merge([], this.modelValue.columns) },
      set (val) { this.updateValue({ columns: val }) },
    },

    operatorValue: {
      get () { return this.modelValue.operator },
      set (val) { this.updateValue({ operator: val }) },
    },

    valuesValue: {
      get () { return merge([], this.modelValue.values) },
      set (val) { this.updateValue({ values: val }) },
    },

    dataType () {
      return this.selectedColumnsData?.[0]?.data_type
    },

    selectedColumnsData () {
      if (this.selectedRefColumnData) { return [this.selectedRefColumnData] }

      return this.columns.filter(c => this.columnsValue.includes(`${c.table_name}.${c.name}`) || this.columnsValue.includes(c.name))
    },

    columnOperators () {
      return this.selectedColumnsData?.[0]?.operators
    },

    operatorData () {
      // Special handling for PRESERVE_PRIORITY - it should always be allowed regardless of columnOperators list
      // Handle case insensitive matching and trim whitespace to be more robust
      const normalizedOperator = (this.operatorValue || '').toString().trim().toUpperCase()
      if (normalizedOperator === 'PRESERVE_PRIORITY') {
        return { render_value_input: false }
      }

      if (! this.columnOperators || ! this.columnOperators[this.operatorType]) { return null }

      // Check if operator exists in the available operators list
      if (! this.columnOperators[this.operatorType].includes(this.operatorValue)) { return null }

      // For merge_values operators, most don't need value input
      if (this.operatorType === 'merge_values') {
        // Only these operators need value input for merge operations
        const operatorsNeedingValueInput = [
          'CUSTOM_VALUE',
          'REPLACE_WITH_VALUE',
          'APPEND_VALUE',
          'PREPEND_VALUE',
          'SET_VALUE',
        ]

        return { render_value_input: operatorsNeedingValueInput.includes(this.operatorValue) }
      }

      // For select_master_record operators (surviving record rules), most don't need value input
      if (this.operatorType === 'select_master_record') {
        return { render_value_input: false }
      }

      // For other operator types, assume they need value input (existing behavior)
      return { render_value_input: true }
    },

    unusedColumns () {
      if (! this.selectedColumns) { return this.columns }

      return this.columns.filter((c) => {
        return (! this.selectedColumns.includes(`${c.table_name}.${c.name}`))
            || this.modelValue.columns.includes(`${c.table_name}.${c.name}`)
      })
    },
  },

  methods: {
    updateValue (val) {
      this.$emit('update:modelValue', mergeWith({}, this.modelValue, val, (obj, src) => isNil(src) ? obj : src))
    },
  },
}
</script>
