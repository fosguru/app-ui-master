<template>
  <div class="inline-flex items-center justify-start gap-2">
    <template v-for="(crumb, idx) in crumbs" :key="idx">
      <NuxtLink v-if="crumb.to" :to="crumb.to" class="text-sm font-semibold text-stone-400 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-500">
        {{ crumb.label }}
      </NuxtLink>
      <span v-else class="text-sm font-semibold text-stone-900 dark:text-stone-300">{{ crumb.label }}</span>
      <PhCaretRight v-if="idx !== crumbs.length - 1" class="size-3 text-stone-400 dark:text-stone-300" weight="bold" />
    </template>
  </div>
</template>

<script>
import { PhCaretRight } from '@phosphor-icons/vue'

export default {
  components: { PhCaretRight },

  props: {
    crumbs: { type: Object, required: true },
  },
}
</script>
