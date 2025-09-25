<template>
  <NuxtLink v-if="!!to" :to="to" type="button" :class="classes">
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :class="classes"
    :disabled="disabled"
    :href="href"
    target="_blank"
    rel="nofollow noopener"
    @click="$emit('click')"
  >
    <slot />
    <SpinnerSm v-if="loading" size="1rem" class="ml-3" />
  </a>
  <button
    v-else
    :class="classes"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <SpinnerSm v-if="loading" size="1rem" />
    <slot />
  </button>
</template>

<script>
import SpinnerSm from '@/components/UI/SpinnerSm'

export default {
  components: { SpinnerSm },

  props: {
    to: { type: String, default: '' },
    href: { type: String, default: '' },
    size: { type: String, default: 'md' },
    color: { type: String, default: 'default' },
    type: { type: String, default: 'button' },
    disabled: Boolean,
    loading: Boolean,
  },

  emits: ['click'],

  computed: {
    classes () {
      const common = `inline-flex items-center justify-center gap-2 font-semibold${this.disabled ? ' opacity-50 cursor-not-allowed' : ''}`

      return `${common} ${this.sizeClass} ${this.colorClass}`
    },

    sizeClass () {
      switch (this.size) {
        case 'xs': return 'px-2.5 py-1 text-xs rounded-3xl'
        case 'sm': return 'px-3 py-1.5 text-sm rounded-3xl'
        case 'md': return 'px-6 py-2 text-base rounded-3xl'
        case 'lg': return 'px-6 py-3 text-base rounded-3xl'
        case 'xl': return 'px-8 py-4 text-lg rounded-3xl'
        case 'icon-sm': return 'p-2 text-base rounded-full'
        case 'icon-md': return 'p-4 text-base rounded-full'
        default: return ''
      }
    },

    colorClass () {
      const shared = 'focus:outline-none focus:z-10 font-semibold'

      switch (this.color) {
        case 'transparent': return `text-gray-700 dark:text-stone-200 hover:bg-gray-50 hover:dark:bg-stone-700 focus:ring-indigo-500 ${shared}`
        case 'white': return `border border-stone-500 text-stone-500 bg-white dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 ${shared}`
        case 'gray': return `border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 ${shared}`
        default: return `bg-red-500 hover:bg-red-700 text-white dark:text-stone-200 focus:bg-red-600 ${shared}`
      }
    },
  },
}
</script>
