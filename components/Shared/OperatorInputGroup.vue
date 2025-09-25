<template>
  <InputGroup :model-value="modelValue" type="select" :options="operatorsOptions" @update:model-value="v => $emit('update:modelValue', v)" />
</template>

<script>
import InputGroup from '~/components/UI/InputGroup.vue'

export default {
  components: { InputGroup },

  props: {
    modelValue: { type: Array, required: true },
    type: { type: String, required: true },
    dataType: { type: String, required: true },
    columnOperators: { type: Object, default: null },
  },

  emits: ['update:modelValue'],

  computed: {
    operatorsOptions () {
      if (! this.columnOperators || ! this.columnOperators[this.type]) { return {} }
      const operators = this.columnOperators[this.type]
      const options = {}
      operators.forEach((operator) => {
        options[operator] = operator.replaceAll('_', ' ').toLowerCase()
      })

      return options
    },
  },
}
</script>
