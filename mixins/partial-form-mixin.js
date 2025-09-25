import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'

export default {
  props: {
    modelValue: { type: [Array, Object], required: true },
    errors: { type: Array, default: null },
  },

  emits: ['update:modelValue'],

  data: () => ({
    form: null,
    preventInput: false, // This is a workaround to prevent double input event from the tab
  }),

  watch: {
    modelValue: {
      deep: true,
      handler (val) {
        if (isEqual(val, this.form)) { return }
        // Update form data without emitting v-model update to avoid infinite update loop
        this.preventInput = true
        this.form = merge(this.partialFormArray ? [] : {}, this.modelValue)
        this.$nextTick(() => (this.preventInput = false))
      },
    },

    form: {
      deep: true,
      handler (val) {
        if (this.preventInput) { return }
        this.$emit('update:modelValue', merge(this.partialFormArray ? [] : {}, val))
      },
    },
  },

  mounted () {
    this.preventInput = true
    this.form = merge(this.partialFormArray ? [] : {}, this.modelValue)
    this.$nextTick(() => (this.preventInput = false))
  },
}
