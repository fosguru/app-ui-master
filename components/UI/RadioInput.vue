<template>
  <label class="flex items-center" :for="id">
    <input
      :id="id"
      type="radio"
      :checked="isChecked"
      :value="value"
      class="size-4 cursor-pointer border-gray-300 text-green-600 focus:ring-green-500"
      :disabled="disabled"
      @change="onChange"
    >
    <span class="ml-3 block cursor-pointer text-sm font-medium" :class="disabled ? 'text-gray-400' : 'text-gray-700 dark:text-stone-200'">
      <slot />
    </span>
  </label>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    id: { type: String, default: () => uuidv4() },
    value: { type: [Boolean, String], default: '' },
    modelValue: { type: [String, Boolean], default: '' },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  computed: {
    isChecked () {
      return this.value === this.modelValue
    },
  },

  methods: {
    onChange (e) {
      let val = e.target.value
      if (typeof this.modelValue === 'boolean') {
        val = e.target.value === 'true'
      }
      this.$emit('update:modelValue', val)
    },
  },
}
</script>
