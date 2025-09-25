<template>
  <div class="inline-flex shrink-0 overflow-hidden rounded-lg border border-red-500 bg-white dark:bg-stone-800">
    <button
      v-for="(label, val, idx) in options"
      :key="idx"
      :class="[val === modelValue ? 'bg-red-500 text-white' : 'text-red-500', disabled ? 'cursor-not-allowed opacity-50' : '']"
      class="px-4 py-1.5 outline-2 outline-blue-200 transition-all"
      :disabled="disabled"
      @click="$emit('update:modelValue', val)"
    >
      <slot v-if="label === 'slot'" :name="val" />
      <span v-else>{{ label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: [Array, String], required: true },
    options: { type: [Object, Array], required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],
}
</script>
