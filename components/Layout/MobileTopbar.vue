<template>
  <div class="w-full">
    <div class="flex w-full items-center justify-between">
      <img src="~/assets/images/logo.svg" alt="" width="115" height="20">

      <button type="button" class="-mr-2 p-2" @click="opened = !opened">
        <PhX v-if="opened" class="size-6 text-gray-900 dark:text-stone-200" />
        <PhList v-else class="size-6 text-gray-900 dark:text-stone-200" />
      </button>
    </div>

    <div
      class="fixed inset-0 top-16 z-30 flex flex-col justify-between bg-white p-4 transition-transform dark:bg-stone-800"
      :class="opened ? '' : '-translate-x-full'"
    >
      <MainMenu />
      <UserDropdown />
    </div>
  </div>
</template>

<script>
import { PhList, PhX } from '@phosphor-icons/vue'
import MainMenu from '~/components/Layout/MainMenu.vue'
import UserDropdown from '~/components/Layout/UserDropdown.vue'

export default {
  components: { UserDropdown, PhX, MainMenu, PhList },

  data: () => ({
    opened: false,
  }),
}
</script>
