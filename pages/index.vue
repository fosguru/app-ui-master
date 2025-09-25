<template>
  <Layout :crumbs="[{ label: 'Dashboard' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Dashboard
    </div>

    <div class="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="flex gap-4">
        <InputGroup v-model="filters.connection" type="select" label="Connection" :options="{ ...connections.reduce((acc, r) => ((acc[r.uuid] = r.name), acc), {}) }" />
      </div>
      <div class="flex gap-2">
        <Btn color="white" @click="getPdf">
          <PhDownloadSimple weight="bold" class="size-4" /> Download report
        </Btn>
      </div>
    </div>

    <DataTable
      ref="table"
      v-model:checked="checked"
      :rows="analysis?.individual_recipe_analysis || []"
      :loading="loadingAnalysis"
      :headers="headers"
      class="mb-5"
    >
      <template #col-count_pending_actions="{ row, cell }">
        <Btn size="xs" :to="`/actions?connection=${filters.connection}&recipe=${row.recipe_uuid}&status=PENDING`">
          {{ $f.number(cell) }} <PhShareFat class="size-4" />
        </Btn>
      </template>

      <template #header-hours_pending>
        Potential time savings <PhInfo v-tooltip="'This is calculated by multiplying the number of pending actions by the average time it takes to resolve an action'" class="-mt-0.5 inline-block size-4" />
      </template>
      <template #col-hours_pending="{ cell }">
        {{ cell }} hours
      </template>

      <template #col-count_success_actions="{ row, cell }">
        <Btn size="xs" color="white" :to="`/actions?connection=${filters.connection}&recipe=${row.recipe_uuid}&status=SUCCESS`">
          {{ $f.number(cell) }}
        </Btn>
      </template>

      <template #header-hours_success>
        Actualized time savings <PhInfo v-tooltip="'This is calculated by multiplying the number of successfully applied actions by the average time it takes to resolve an action'" class="-mt-0.5 inline-block size-4" />
      </template>
      <template #col-hours_success="{ cell }">
        {{ cell }} hours
      </template>

      <!-- <template #col-actions="{ row, cell }">
        <Btn :to="`/actions?recipe=${row.recipe_uuid}&status=PENDING`" size="sm">
          Review Pending Actions
        </Btn>
      </template> -->

      <!-- <template #header-config>
        Settings <PhInfo v-tooltip="'This is calculated by multiplying the number of pending actions by the average time it takes to resolve an action'" class="-mt-0.5 inline-block size-4" />
      </template> -->
      <template #col-config="{ row }">
        <Btn size="sm" :to="`/recipes/${row.recipe_uuid}`" color="white">
          <PhGear class="size-4" weight="bold" />
        </Btn>
      </template>

      <template #tfoot>
        <tfoot v-if="analysis.aggregate_analysis?.[0]" class="border-t dark:border-t">
          <tr class="bg-gray-100 text-sm font-semibold dark:bg-stone-800 dark:text-stone-200 ">
            <td class="p-4 sm:px-6">
              Totals
            </td>
            <!-- <td class="p-4 sm:px-6">
              {{ analysis.aggregate_analysis[0].total_action_count }}
            </td> -->
            <td class="p-4 sm:px-6">
              {{ $f.number(analysis.aggregate_analysis[0].count_pending_actions) }}
            </td>
            <td class="p-4 sm:px-6">
              {{ analysis.aggregate_analysis[0].hours_pending }} hours
            </td>
            <td class="p-4 sm:px-6">
              {{ $f.number(analysis.aggregate_analysis[0].count_success_actions) }}
            </td>
            <td class="p-4 sm:px-6">
              {{ analysis.aggregate_analysis[0].hours_success }} hours
            </td>
            <td class="p-4 sm:px-6">
              <!-- intentionally blank -->
            </td>
            <td v-if="!hideActions" class="p-4 sm:px-6" />
          </tr>
        </tfoot>
      </template>
    </DataTable>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { PhDownloadSimple, PhGear, PhInfo, PhShareFat } from '@phosphor-icons/vue'
import Btn from '~/components/UI/Btn.vue'
import Layout from '~/components/Layout/Layout.vue'
import DataTable from '~/components/UI/DataTable.vue'
import { useHead, useRuntimeConfig } from '#imports'
import { useActionsStore } from '~/stores/actions'
import InputGroup from '~/components/UI/InputGroup.vue'
import { useRecipesStore } from '~/stores/recipes'
import { useConnectionsStore } from '~/stores/connections'

export default {
  components: { PhInfo, PhGear, PhShareFat, PhDownloadSimple, InputGroup, DataTable, Layout, Btn },

  setup () {
    useHead({
      title: `Analysis | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    hideActions: false,
    filters: {
      connection: null,
    },
  }),

  computed: {
    ...mapState(useConnectionsStore, ['connections']),
    ...mapState(useActionsStore, ['loadingAnalysis', 'analysis']),

    headers () {
      return [
        { text: 'Recipe', value: 'recipe_name_formatted' },
        { text: 'Pending Actions', value: 'count_pending_actions' },
        { value: 'hours_pending' },
        { text: 'Successful Actions', value: 'count_success_actions' },
        { value: 'hours_success' },
        { value: 'config' },
        ...(this.hideActions ? [] : [{ text: '', value: 'actions' }]),
      ]
    },
  },

  watch: {
    filters: {
      deep: true,
      handler () {
        this.loadAnalysis()
      },
    },
  },

  async mounted () {
    await this.getConnections()
    this.setFilters()
    this.loadAnalysis()
  },

  methods: {
    ...mapActions(useConnectionsStore, ['getConnections']),
    ...mapActions(useActionsStore, ['getAnalysis']),
    ...mapActions(useRecipesStore, ['getRecipes']),

    setFilters () {
      this.filters.connection = this.$route.query.connection || this.connections[0].uuid
    },

    updateQuery () {
      const url = new URL(window.location)
      for (const key of Object.keys(this.filters)) {
        this.filters[key] ? url.searchParams.set(key, this.filters[key]) : url.searchParams.delete(key)
      }
      window.history.pushState({}, '', url)
    },

    async loadAnalysis (page = 1) {
      this.offset = this.limit * (page - 1)
      await this.getAnalysis(this.filters.connection, this.filters.status, this.filters.recipe, this.limit, this.offset)
      this.updateQuery()
    },

    getPdf () {
      this.hideActions = true
      this.$nextTick(async () => {
        await this.generatePdf()
        this.hideActions = false
      })
    },

    async generatePdf () {
      const table = this.$refs.table.$el.firstChild

      const { jsPDF } = await import('jspdf')
      await import('jspdf-autotable')

      // eslint-disable-next-line new-cap
      const doc = new jsPDF()
      doc.autoTable({ html: table })
      doc.save('datachef-report.pdf')
    },
  },
}
</script>
