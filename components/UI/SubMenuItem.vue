<template>
  <NuxtLink
    :to="to"
    class="group mt-1 flex w-full items-center rounded-md py-3 pl-10 pr-2 text-sm font-normal text-gray-300"
    :class="current ? 'bg-gray-900 text-white' : ' hover:bg-gray-700'"
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
      return this.$route.path.startsWith(this.to)
    },
  },
}
</script>
