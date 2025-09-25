<template>
  <div class="flex items-center py-3">
    <img v-if="!user || (!user?.first_name && !user?.last_name)" src="~/assets/images/user.svg" alt="" class="size-8 rounded-full">
    <div v-else class="flex size-8 items-center justify-center rounded-full bg-gray-300 text-sm uppercase">
      {{ user?.first_name?.[0] }}{{ user?.last_name?.[0] }}
    </div>
    <Dropdown class="ml-2">
      <template #button="{ toggle }">
        <button class="flex items-center text-left" @click="toggle">
          <span>
            <span class="block text-sm text-stone-900 dark:text-stone-300">
              {{ user?.first_name }} {{ user?.last_name }}
            </span>
            <span class="block text-xs text-stone-500">
              {{ organization?.name }}
            </span>
          </span>
          <PhCaretDown class="ml-3 size-4 text-stone-500" weight="bold" />
        </button>
      </template>
      <DropdownMenuItem v-for="org in organizations.filter(o => o.organization.uuid !== organization.uuid)" :key="org.organization.uuid" @click="changeOrg(org)">
        Switch to: "{{ org.organization.name }}"
      </DropdownMenuItem>
      <DropdownMenuItem @click="logout">
        Logout
      </DropdownMenuItem>
    </Dropdown>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'
import { navigateTo } from 'nuxt/app'
import { mapActions, mapState } from 'pinia'
import Dropdown from '~/components/UI/Dropdown.vue'
import DropdownMenuItem from '~/components/UI/DropdownMenuItem.vue'
import { useAuthStore } from '~/stores/auth'
import { useOrganizationsStore } from '~/stores/organization'
import { useCookie } from '#app'

export default defineComponent({
  components: { PhCaretDown, DropdownMenuItem, Dropdown },

  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useOrganizationsStore, ['organization', 'organizations']),
  },

  methods: {
    ...mapActions(useOrganizationsStore, ['getOrganization']),

    logout () {
      useAuthStore().logout()
      navigateTo('/login')
    },

    async changeOrg (org) {
      useCookie('datachef-org', { path: '/', maxAge: (60 * 60 * 24 * 30) }).value = org.organization.uuid
      window.location = '/'
    },
  },
})
</script>
