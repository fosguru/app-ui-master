<template>
  <div class="divide-y divide-gray-200 border border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-700 md:rounded-lg">
    <div v-if="$slots.header" class="p-4 text-gray-900 sm:px-6 sm:py-5">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="p-4 sm:p-6" :class="defaultClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 sm:px-6">
      <slot name="footer" />
    </div>
    <slot name="raw" />
  </div>
</template>

<script>
export default {
  props: {
    defaultClass: { type: [String, Array, Object], default: null },
  },
}
</script>
