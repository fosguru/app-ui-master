<template>
  <Layout :crumbs="[{ label: 'Connections' }]">
    <div class="mb-6 flex items-center justify-between">
      <div class="text-xl font-semibold text-stone-900 dark:text-stone-300">
        Connections
      </div>
      <Btn v-if="permissions.create" color="white" to="/connections/add">
        <PhPlus class="size-4" weight="bold" /> Add Connection
      </Btn>
    </div>
    <DataTable :rows="connections" :loading="loading" :headers="headers" class="mb-10">
      <template #col-connection_type="{ cell, row }">
        <div class="flex items-center gap-2">
          <ConnectionIcon :type="row.connection_type" class="mr-2" />
          <span>{{ $f.capitalize(cell.replace('_', ' ')) }}</span>
          <Badge
            v-if="row.environment_type"
            size="md"
            :class="environmentBadgeClass(row.environment_type)"
            :text="row.environment_type"
          />
        </div>
      </template>
      <template #col-status="{ cell }">
        <ConnectionStatus :status="cell" />
      </template>
      <template #col-actions="{ row }">
        <div class="flex justify-end gap-2">
          <Btn v-if="row.status === 'active'" size="sm" color="white" :to="`/connections/${row.uuid}/synced-fields`">
            View Synced Tables & Fields
          </Btn>
          <Btn v-if="permissions.update" size="sm" color="white" @click="onEdit(row)">
            Edit
          </Btn>
          <Btn v-if="permissions.delete" size="sm" color="white" @click="onDelete(row)">
            Delete
          </Btn>
        </div>
      </template>
    </DataTable>
    <EditConnectionModal v-model="editConnection" @updated="getConnections" />
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { PhPlus } from '@phosphor-icons/vue'
import Layout from '~/components/Layout/Layout.vue'
import Btn from '~/components/UI/Btn.vue'
import Badge from '~/components/UI/Badge.vue'
import { useConnectionsStore } from '~/stores/connections'
import DataTable from '~/components/UI/DataTable.vue'
import EditConnectionModal from '~/components/Connections/EditConnectionModal.vue'
import ConnectionIcon from '~/components/Connections/ConnectionIcon.vue'
import { useOrganizationsStore } from '~/stores/organization'
import { useHead, useRuntimeConfig } from '#imports'
import ConnectionStatus from '~/components/Connections/ConnectionStatus.vue'

export default {
  components: { ConnectionStatus, ConnectionIcon, EditConnectionModal, DataTable, Btn, Badge, Layout, PhPlus },

  setup () {
    useHead({
      title: `Connections | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    headers: [
      { text: 'Type', value: 'connection_type' },
      { text: 'Name', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: '', value: 'actions' },
    ],

    editConnection: null,
    intervalId: null,
  }),

  computed: {
    ...mapState(useConnectionsStore, ['loading', 'connections']),
    ...mapState(useOrganizationsStore, { permissions: s => s.organization.user_permissions.all }),
  },

  mounted () {
    this.getConnections()
    this.intervalId = setInterval(() => this.getConnections, 1000)
  },

  beforeUnmount () {
    clearInterval(this.intervalId)
  },

  methods: {
    ...mapActions(useConnectionsStore, ['getConnections', 'deleteConnection']),

    environmentBadgeClass (environmentType) {
      switch (environmentType) {
        case 'production':
          return 'bg-blue-100 text-blue-800'
        case 'sandbox':
          return 'bg-yellow-100 text-yellow-800'
        case 'developer':
          return 'bg-orange-100 text-orange-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },

    onEdit (connection) {
      this.editConnection = connection
    },

    async onDelete (connection) {
      if (! confirm('Are you sure?')) { return }
      await this.deleteConnection(connection.uuid)
      await this.getConnections()
    },
  },
}
</script>
