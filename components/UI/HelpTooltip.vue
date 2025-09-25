<template>
  <span v-tooltip="text" class="ml-3 inline-flex size-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700">{{ label }}</span>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '!' },
    text: { type: String, required: true },
  },
}
</script>
