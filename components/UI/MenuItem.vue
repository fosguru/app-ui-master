<template>
  <NuxtLink
    :to="to"
    class="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 text-sm font-semibold focus:outline-none"
    :class="current ? 'text-rose-500 bg-rose-500/10' : 'text-stone-500 hover:bg-rose-500/10 dark:text-stone-300'"
    @click="$emit('navigated')"
  >
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
  },

  emits: ['navigated'],

  computed: {
    current () {
      return (this.to === '/' && this.$route.path === '/') || (this.to !== '/' && this.$route.path.startsWith(this.to))
    },
  },
}
</script>
