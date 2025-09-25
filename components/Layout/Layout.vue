<template>
  <div class="flex h-screen">
    <div class="hidden w-52 shrink-0 border-r border-stone-200 bg-white px-6 dark:border-stone-800 dark:bg-stone-800 lg:block">
      <img src="~/assets/images/logo.svg" alt="" width="115" height="20" class="mx-auto my-8">
      <MainMenu />
    </div>
    <div class="flex w-full min-w-0 flex-col">
      <div class="flex h-16 items-center justify-between border-b border-stone-200 px-4 dark:border-stone-800 dark:bg-stone-900 lg:px-6">
        <MobileTopbar class="lg:hidden" />
        <Breadcrumbs :crumbs="crumbs" class="hidden lg:inline-flex" />
        <UserDropdown class="hidden lg:flex " />
      </div>
      <div class="relative flex-1 overflow-y-auto overflow-x-hidden p-2 dark:bg-stone-900 dark:text-stone-400 lg:p-6" :class="loading ? 'flex items-center justify-center' : ''">
        <SpinnerIcon v-if="loading" class="size-6" />
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script>
import UserDropdown from '~/components/Layout/UserDropdown.vue'
import Breadcrumbs from '~/components/UI/Breadcrumbs.vue'
import MainMenu from '~/components/Layout/MainMenu.vue'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'
import MobileTopbar from '~/components/Layout/MobileTopbar.vue'

export default {
  components: { MobileTopbar, SpinnerIcon, MainMenu, Breadcrumbs, UserDropdown },

  props: {
    crumbs: { type: Object, required: true },
    loading: Boolean,
  },
}
</script>
