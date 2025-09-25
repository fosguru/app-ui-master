<template>
  <button
    :id="id"
    type="button"
    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
    :class="[modelValue ? 'bg-red-500' : 'bg-gray-200 dark:bg-stone-500', disabled ? 'opacity-50' : '']"
    role="switch"
    aria-checked="false"
    :disabled="disabled"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      aria-hidden="true"
      :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      class="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
    />
  </button>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    id: { type: String, default: () => uuidv4() },
    modelValue: { type: Boolean, required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],
}
</script>
