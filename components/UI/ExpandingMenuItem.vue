<template>
  <div class="px-2">
    <button
      type="button"
      class="flex w-full items-center rounded-md p-3 text-left text-sm focus:outline-none"
      :class="[
        current && !expanded
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
      ]"
      @click="expanded = !expanded"
    >
      <slot name="button" />
      <svg
        class="ml-3 size-5 shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
        :class="expanded ? 'rotate-90 text-gray-600' : 'text-gray-600'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
    </button>
    <CollapseTransition>
      <div v-show="expanded">
        <slot />
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
import CollapseTransition from '~/components/UI/CollapseTransition'

export default {
  components: { CollapseTransition },

  props: {
    current: { type: Boolean, default: false },
  },

  data: () => ({
    expanded: false,
  }),

  mounted () {
    this.expanded = this.current
  },
}
</script>
