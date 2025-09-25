<template>
  <a
    role="button"
    class="flex w-full cursor-pointer items-center whitespace-nowrap px-4 py-1 text-left text-sm leading-8 focus:outline-none lg:hover:bg-gray-200 lg:dark:hover:bg-stone-600"
    :class="disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-100'"
    :disabled="disabled || loading"
    @click="disabled || $emit('click')"
  >
    <slot />
    <SpinnerIcon v-if="loading" class="ml-2 size-4" />
  </a>
</template>

<script>
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'

export default {
  components: { SpinnerIcon },
  props: {
    disabled: Boolean,
    loading: Boolean,
  },

  emits: ['click'],
}
</script>
