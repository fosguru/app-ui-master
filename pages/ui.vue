<template>
  <div class="flex min-h-screen grow flex-col bg-white dark:bg-stone-800 dark:text-stone-200">
    <div class="flex flex-row items-center justify-between border-b-2 border-gray-300 p-4 dark:border-stone-600">
      <NuxtLink to="/ui" class="font-sans text-xl font-bold">
        Components Library
      </NuxtLink>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </div>
    <div class="flex flex-1 flex-row">
      <nav class="flex min-h-full w-80 flex-col gap-4 border-r-2 border-gray-300 bg-gray-100 p-4 dark:border-stone-500 dark:bg-stone-600">
        <details class="ml-8 flex flex-col" open>
          <summary class="-ml-6">
            Base Elements
          </summary>

          <NuxtLink exact-active-class="font-bold" to="/ui">
            Buttons
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/checkboxes">
            Checkboxes
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/switches">
            Switches
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/radios">
            Radios
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/inputs">
            Inputs
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/dropdown-inputs">
            Dropdown Inputs
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/file-inputs">
            File Inputs
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/selects">
            Selects
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/dropdowns">
            Dropdowns
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/tooltips">
            Tooltips
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/badges">
            Badges
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/modals">
            Modals
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/panels">
            Panels
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/tabs">
            Tabs
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/datatables">
            Data tables
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/breadcrumbs">
            Breadcrumbs
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/toasts">
            Toast Notification
          </NuxtLink>
          <NuxtLink exact-active-class="font-bold" to="/ui/alerts">
            Alert Banners
          </NuxtLink>
        </details>
      </nav>
      <main class="min-h-full w-full">
        <NuxtPage />
      </main>
    </div>
    <Notifications />
    <GlobalDialog />
  </div>
</template>

<script>
import { useRuntimeConfig } from 'nuxt/app'
import Notifications from '~/components/Layout/Notifications.vue'
import GlobalDialog from '~/components/Layout/GlobalDialog.vue'

export default {
  components: { Notifications, GlobalDialog },

  setup () {
    if (useRuntimeConfig().public.releaseStage === 'production') {
      throw createError({ statusCode: 404, message: 'Not Found', fatal: true })
    }
  },
}
</script>
