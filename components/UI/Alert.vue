<template>
  <div v-if="modelValue" class="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white">
    <span><slot /></span>
    <button type="button" @click="$emit('update:modelValue', false)">
      <PhX weight="bold" class="size-5 text-white" />
    </button>
  </div>
</template>

<script>
import { PhX } from '@phosphor-icons/vue'

export default {
  components: { PhX },

  props: {
    modelValue: Boolean,
  },

  emits: ['update:modelValue'],
}
</script>
