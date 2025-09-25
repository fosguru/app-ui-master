<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-4 rounded-lg border border-stone-200 bg-white px-6 py-4 text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
    :disabled="disabled"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
  >
    <slot />
    <div class="text-sm font-semibold">
      {{ label }}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    label: { type: String, required: true },
    disabled: Boolean,
  },
}
</script>
