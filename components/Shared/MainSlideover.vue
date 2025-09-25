<template>
  <div
    class="fixed inset-y-0 right-0 top-16 z-10 h-full w-72 border border-stone-200 bg-stone-100 p-6 transition-transform"
    :class="opened ? '' : 'translate-x-[17.7rem] lg:translate-x-[16.7rem]'"
  >
    <button class="absolute -left-4 inline-flex size-8 items-center justify-center gap-2.5 rounded-3xl border border-red-500 bg-white text-red-500 shadow" @click="opened = !opened">
      <PhCaretRight v-if="opened" class="size-4" weight="bold" />
      <PhCaretLeft v-else class="size-4" weight="bold" />
    </button>
    <slot />
  </div>
</template>

<script>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

export default {
  components: { PhCaretRight, PhCaretLeft },

  data: () => ({
    opened: false,
  }),
}
</script>
