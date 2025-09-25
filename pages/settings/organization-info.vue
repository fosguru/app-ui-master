<template>
  <Layout :crumbs="[{ label: 'Settings', to: '/settings' }, { label: 'Organization Settings' }]">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-xl font-semibold leading-loose text-stone-900 dark:text-stone-300">
        Organization Settings
      </div>
    </div>
    <Panel>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="flex items-center justify-center">
          <div>
            <PhHouse class="size-16" />
          </div>
        </div>
        <div>
          <InputGroup v-model="organization.name" label="Company name" class="mb-8" disabled />
          <InputGroup v-model="organization.primary_domain" label="Primary email domain" class="mb-4" disabled />
        </div>
      </div>
    </Panel>

    <h2 class="mb-4 mt-8 flex items-center gap-2 text-xl font-medium text-stone-900 dark:text-stone-300">
      Manage User Roles & Permissions <PhQuestion v-tooltip="'Only users with an Admin role may edit the roles of other users.'" class="size-5" weight="bold" />
    </h2>
    <DataTable :headers="headers" :loading="loadingMembers" :rows="members?.results || []">
      <template #col-name="{ row }">
        {{ row.user.first_name }}
        {{ row.user.last_name }}
      </template>
      <template #col-role="{ row }">
        <InputGroup
          v-if="row.permissions.update"
          :model-value="row.role"
          type="select"
          :options="row.user_roles.reduce((acc, r) => ((acc[r] = r[0] + r.slice(1).toLowerCase()), acc), {})"
          @update:model-value="v => onUpdateMember(row, { role: v })"
        />
        <div v-else class="capitalize">
          {{ row.role.toLowerCase() }}
        </div>
      </template>
    </DataTable>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { PhHouse, PhQuestion } from '@phosphor-icons/vue'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import InputGroup from '~/components/UI/InputGroup.vue'
import { useOrganizationsStore } from '~/stores/organization'
import { useHead, useRuntimeConfig } from '#imports'
import DataTable from '~/components/UI/DataTable.vue'

export default {
  components: { PhQuestion, DataTable, PhHouse, InputGroup, Panel, Layout },

  setup () {
    useHead({
      title: `Organization Info | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    headers: [
      { text: 'Name', value: 'name', innerClass: 'whitespace-break-spaces' },
      { text: 'Email', value: 'user.email', innerClass: 'break-all whitespace-break-spaces' },
      { text: 'Role', value: 'role' },
    ],
  }),

  computed: {
    ...mapState(useOrganizationsStore, ['organization', 'loadingMembers', 'members']),
  },

  mounted () {
    this.getMembers(this.organization.uuid)
  },

  methods: {
    ...mapActions(useOrganizationsStore, ['getMembers', 'updateMember']),

    async onUpdateMember (member, form) {
      await this.updateMember(this.organization.uuid, member.uuid, form)
      this.$notify({
        title: 'Success',
        text: 'Member was updated successfully.',
        type: 'info',
      })
    },
  },
}
</script>
