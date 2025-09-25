<template>
  <div class="rounded-lg bg-white px-3.5 py-3 shadow dark:bg-stone-700 dark:text-stone-200">
    <a href="#" class="flex items-center justify-between" :class="headerClass" @click.prevent="toggle">
      <div class="font-semibold text-stone-700 dark:text-stone-200">
        <slot name="header" />
        {{ header }}
      </div>
      <PhCaretUp v-if="show" class="size-4" weight="bold" />
      <PhCaretDown v-else class="size-4" weight="bold" />
    </a>
    <HeightTransition v-model="show" :default-open="defaultOpen">
      <div class="pt-2 text-stone-700">
        <slot />
      </div>
    </HeightTransition>
  </div>
</template>

<script>
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import HeightTransition from './HeightTransition'

export default {
  components: { PhCaretUp, PhCaretDown, HeightTransition },

  props: {
    header: { type: String, default: '' },
    headerClass: { type: String, default: '' },
    defaultOpen: Boolean,
  },

  emits: ['opened', 'closed'],

  data: () => ({
    show: false,
  }),

  created () {
    this.show = this.defaultOpen
  },

  methods: {
    toggle () {
      this.show = ! this.show
      this.$emit(this.show ? 'opened' : 'closed')
    },
  },
}
</script>
