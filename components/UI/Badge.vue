<template>
  <span
    class="inline-block rounded align-middle uppercase leading-3"
    :class="classes"
  ><slot />{{ text }}</span>
</template>

<script>
export default {
  props: {
    size: { type: String, default: 'md' },
    text: { type: [String, Number], default: '' },
  },

  computed: {
    classes () {
      switch (this.size) {
        case 'xs': return 'px-1 py-0.5 text-3xs'
        case 'sm': return 'px-1 py-0.5 text-2xs'
        case 'md': return 'px-1.5 py-1 text-xs'
        case 'lg': return 'px-1.5 py-1 text-sm'
        default: return 'px-2.5 py-0.5 text-xs'
      }
    },
  },
}
</script>
