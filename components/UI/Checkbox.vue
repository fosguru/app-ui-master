<template>
  <label
    class="custom-label flex items-center"
    :class="disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'"
  >
    <slot name="before" />
    <input type="checkbox" class="hidden" :checked="modelValue" :disabled="disabled" @change="change">
    <span
      v-if="modelValue"
      class="flex items-center justify-center rounded bg-red-500"
      :class="size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'"
    >
      <CheckBoldIcon class="text-white" :class="size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'" />
    </span>
    <span
      v-else
      class="rounded-sm border-2 border-gray-300 bg-white dark:border-stone-500 dark:bg-stone-800"
      :class="size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'"
    />
    <span v-if="$slots.default" class="ml-2 inline-flex">
      <slot />
    </span>
  </label>
</template>

<script>
import CheckBoldIcon from '@/components/Icons/CheckBoldIcon.vue'

export default {
  components: { CheckBoldIcon },

  props: {
    modelValue: Boolean,
    disabled: Boolean,
    size: { type: String, default: 'md' },
  },

  emits: ['update:modelValue'],

  methods: {
    change (e) {
      this.$emit('update:modelValue', e.target.checked)
    },
  },
}
</script>
