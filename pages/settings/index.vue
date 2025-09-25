<template>
  <Layout :crumbs="[{ label: 'Settings' }]">
    <div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
      <SettingsMenuItem label="Personal Settings" to="/settings/personal-info">
        <PhUser class="size-5" weight="bold" />
      </SettingsMenuItem>
      <SettingsMenuItem label="Organization Settings" to="/settings/organization-info">
        <PhHouse class="size-5" weight="bold" />
      </SettingsMenuItem>
      <SettingsMenuItem label="Getting Started" to="/start">
        <PhRocketLaunch class="size-5" weight="bold" />
      </SettingsMenuItem>
      <SettingsMenuItem label="Security Review" to="/settings/security-review">
        <PhLock class="size-5" weight="bold" />
      </SettingsMenuItem>
      <SettingsMenuItem label="Subscription" to="/settings/subscription">
        <PhMoney class="size-5" weight="bold" />
      </SettingsMenuItem>
    </div>
  </Layout>
</template>

<script>
import { PhHouse, PhLock, PhMoney, PhRocketLaunch, PhUser } from '@phosphor-icons/vue'
import Layout from '~/components/Layout/Layout.vue'
import SettingsMenuItem from '~/components/Settings/SettingsMenuItem.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { PhMoney, SettingsMenuItem, PhHouse, PhLock, PhRocketLaunch, PhUser, Layout },

  setup () {
    useHead({
      title: `Settings | ${useRuntimeConfig().public.appName}`,
    })
  },
}
</script>
