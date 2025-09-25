<template>
  <Layout :crumbs="[{ label: 'Actions' }]">
    <div class="mb-4 text-xl font-semibold leading-loose text-stone-900 lg:hidden">
      Actions
    </div>

    <div class="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="flex gap-4">
        <InputGroup v-model="filters.connection" type="select" label="Connection" :options="{ ...connections.reduce((acc, r) => ((acc[r.uuid] = r.name), acc), {}) }" />
        <InputGroup v-model="filters.recipe" type="select" label="Recipes" :options="{ null: 'All Recipes', ...recipes.reduce((acc, r) => ((acc[r.uuid] = r.label), acc), {}) }" />
        <InputGroup v-model="filters.status" type="select" label="Action Status" :options="{ PENDING: 'Pending Review', SUCCESS: 'Success', APPROVED: 'Approved', REJECTED: 'Rejected', ERROR: 'Error' }" />
      </div>
      <div v-if="filters.status === 'PENDING'" class="flex gap-2">
        <Btn color="white" :disabled="!checked.length" :loading="approving" @click="onApprove(actions.filter(a => checked.includes(a.uuid)))">
          <PhCheck color="green" class="size-4" weight="bold" />
          Approve {{ checked.length || '' }} actions
        </Btn>
        <Btn color="white" :disabled="!checked.length" :loading="declining" @click="onDecline(actions.filter(a => checked.includes(a.uuid)))">
          <PhProhibit color="red" class="size-4" weight="bold" />
          Decline {{ checked.length || '' }} actions
        </Btn>
      </div>
      <div v-if="filters.status === 'ERROR'" class="flex gap-2">
        <Btn color="white" :disabled="!checked.length" :loading="retrying" @click="onRetry(actions.filter(a => checked.includes(a.uuid)))">
          Retry selected
        </Btn>
      </div>
    </div>

    <DataTable
      v-model:checked="checked"
      :rows="actions"
      :loading="loading"
      :headers="headers"
      class="mb-5"
      :checkboxes="filters.status === 'PENDING'"
    >
      <template #col-action_data="{ cell, row }">
        <!-- Merge Action Table -->
        <div v-if="isMergeAction(row)" class="merge-table-container">
          <table class="merge-table border-collapse border border-gray-300 text-xs">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="action-fields-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Fields
                </th>
                <th class="action-values-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Surviving Record
                </th>
                <th v-for="(record, index) in getMergeRecords(row)" :key="index" class="action-values-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Values
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Add ID row first -->
              <tr>
                <td class="border border-gray-300 px-2 py-1 font-medium dark:border-gray-600 dark:text-stone-300">
                  ID
                </td>
                <td class="border border-gray-300 px-2 py-1 dark:border-gray-600">
                  <span class="font-bold text-gray-700 dark:text-gray-300" title="Surviving Record Id">
                    <a
                      v-if="getExternalLinkForId(row, (row.action_data && row.action_data.surviving_record_id) || (getMergeRecords(row)[0] && getMergeRecords(row)[0].id))"
                      :href="getExternalLinkForId(row, (row.action_data && row.action_data.surviving_record_id) || (getMergeRecords(row)[0] && getMergeRecords(row)[0].id))"
                      target="_blank"
                    >
                      {{ (row.action_data && row.action_data.surviving_record_id) || (getMergeRecords(row)[0] && getMergeRecords(row)[0].id) || 'N/A' }}
                      <PhLink class="ml-2 inline size-4" />
                    </a>
                    <span v-else>{{ (row.action_data && row.action_data.surviving_record_id) || (getMergeRecords(row)[0] && getMergeRecords(row)[0].id) || 'N/A' }}</span>
                  </span>
                </td>
                <td
                  v-for="(record, recordIndex) in getMergeRecords(row)"
                  :key="`id-${recordIndex}`"
                  class="border border-gray-300 px-2 py-1 dark:border-gray-600"
                >
                  <a
                    v-if="getExternalLinkForId(row, record.id)"
                    :href="getExternalLinkForId(row, record.id)"
                    target="_blank"
                  >
                    {{ record.id || 'N/A' }}
                    <PhLink class="ml-1 inline size-4" />
                  </a>
                  <span v-else>{{ record.id || 'N/A' }}</span>
                </td>
              </tr>
              <!-- Other fields -->
              <tr v-for="(field, fieldName) in getMergeFields(row)" :key="fieldName">
                <td class="border border-gray-300 px-2 py-1 font-medium dark:border-gray-600" :title="fieldName">
                  {{ formatFieldName(fieldName) }}
                </td>
                <td class="border border-gray-300 px-2 py-1 dark:border-gray-600">
                  <span class="font-bold" :title="field.surviving">
                    {{ field.surviving }}
                  </span>
                </td>
                <td
                  v-for="(value, recordIndex) in field.records"
                  :key="`${fieldName}-${recordIndex}`"
                  class="border border-gray-300 px-2 py-1 dark:border-gray-600"
                  :title="value || 'Empty'"
                >
                  <span v-if="value" class="block truncate">{{ value }}</span>
                  <span v-else class="italic text-gray-400">Empty</span>
                </td>
              </tr>
              <tr v-if="Object.keys(getMergeFields(row)).length === 0">
                <td colspan="100%" class="border border-gray-300 px-2 py-1 text-center italic text-gray-500 dark:border-gray-600">
                  No merge fields detected
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Purge Action Table -->
        <div v-else-if="isPurgeAction(row)" class="merge-table-container">
          <table class="merge-table border-collapse border border-gray-300 text-xs">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="action-fields-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Fields
                </th>
                <th class="action-values-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Values
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getPurgeTableData(row)" :key="item.field">
                <td class="border border-gray-300 px-2 py-1 font-medium dark:border-gray-600" :title="item.field">
                  {{ formatFieldName(item.field) }}
                </td>
                <td class="border border-gray-300 px-2 py-1 dark:border-gray-600">
                  <div class="flex flex-col gap-1">
                    <!-- ID with link -->
                    <div v-if="item.isId && item.externalLink">
                      <a
                        :href="item.externalLink"
                        target="_blank"
                      >
                        <span v-html="item.value" />
                        <PhLink class="ml-1 inline size-3" />
                      </a>
                    </div>
                    <!-- Regular value -->
                    <div v-else>
                      <span v-html="item.value" />
                      <!-- Validation badge if there's an issue -->
                      <Badge
                        v-if="item.hasValidationIssue"
                        class="ml-3 bg-rose-200 text-rose-800"
                        size="sm"
                      >
                        <PhWarningCircle class="inline size-3" />
                        Invalid - {{ item.validationMessage }}
                      </Badge>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="getPurgeTableData(row).length === 0">
                <td colspan="2" class="border border-gray-300 px-2 py-1 text-center italic text-gray-500 dark:border-gray-600">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Default Action Data (non-merge, non-purge) -->
        <div v-else class="merge-table-container">
          <table class="merge-table border-collapse border border-gray-300 text-xs">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="action-fields-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Fields
                </th>
                <th class="action-values-column border border-gray-300 px-2 py-1 text-left font-semibold dark:border-gray-600 dark:text-stone-300">
                  Values
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Render all_row_json as table if available -->
              <template v-if="row.all_row_json && Array.isArray(row.all_row_json) && row.all_row_json.length > 0">
                <tr v-for="(record, recordIndex) in row.all_row_json" :key="`record-${recordIndex}`">
                  <td colspan="2" class="border border-gray-300 px-2 py-1 font-semibold dark:border-gray-600">
                    Record {{ recordIndex + 1 }}
                  </td>
                </tr>
                <tr v-for="(value, fieldName) in row.all_row_json[0]" :key="fieldName">
                  <td class="border border-gray-300 px-2 py-1 font-medium dark:border-gray-600" :title="fieldName">
                    {{ formatFieldName(fieldName) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-1 dark:border-gray-600">
                    <div v-if="fieldName.toLowerCase() === 'id'">
                      <a
                        v-if="getExternalLinkForId(row, value)"
                        :href="getExternalLinkForId(row, value)"
                        class="underline decoration-rose-200"
                        target="_blank"
                      >
                        {{ formatFieldValue(value) }}
                        <PhLink class="ml-1 inline size-3" />
                      </a>
                      <span v-else>{{ formatFieldValue(value) }}</span>
                    </div>
                    <span v-else>{{ formatFieldValue(value) }}</span>
                  </td>
                </tr>
              </template>
              <!-- Fallback to action_data if no all_row_json -->
              <template v-else>
                <tr v-for="(val, key) in cell" :key="key">
                  <td class="border border-gray-300 px-2 py-1 font-medium dark:border-gray-600" :title="key">
                    {{ key === 'master_id' ? 'Surviving Record Id' : formatFieldName(key) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-1 dark:border-gray-600">
                    <span v-if="typeof val !== 'object'" class="whitespace-break-spaces break-all">
                      {{ val }}
                    </span>
                    <ul v-else class="list-disc pl-4">
                      <li v-for="(val1, key1) in val" :key="key1">
                        <span class="font-bold">{{ key1 }}</span>:
                        <span class="whitespace-break-spaces break-all">{{ val1 }}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
      <template #col-results="{ cell, idx }">
        <div :ref="`results-${idx}`" class="text-xs">
          {{ resultsFormatted(cell, idx) }}
        </div>
      </template>
      <template #col-actions="{ row }">
        <div v-if="row.action_status === 'PENDING'" class="flex justify-end gap-2">
          <Btn size="sm" :loading="approving" @click="onApprove([row])">
            <PhCheck class="size-4" weight="bold" />
            Approve
          </Btn>
          <Btn size="sm" color="white" :loading="declining" @click="onDecline([row])">
            <PhProhibit class="size-4" weight="bold" />
            Decline
          </Btn>
        </div>
        <Btn v-if="row.action_status === 'ERROR'" size="sm" color="white" :loading="retrying" @click="onRetry([row])">
          <PhArrowsCounterClockwise class="size-4" weight="bold" />
          Retry
        </Btn>
      </template>
    </DataTable>

    <Pagination :total="total" :limit="limit" :offset="offset" :loading="loading" @change="loadActions" />
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { PhArrowsCounterClockwise, PhCheck, PhLink, PhProhibit, PhWarningCircle } from '@phosphor-icons/vue'
import JSONFormatter from 'json-formatter-js'
import Btn from '~/components/UI/Btn.vue'
import Layout from '~/components/Layout/Layout.vue'
import DataTable from '~/components/UI/DataTable.vue'
import { useHead, useRuntimeConfig } from '#imports'
import { useActionsStore } from '~/stores/actions'
import InputGroup from '~/components/UI/InputGroup.vue'
import Badge from '~/components/UI/Badge.vue'
import { useRecipesStore } from '~/stores/recipes'
import Pagination from '~/components/UI/Pagination.vue'
import { useConnectionsStore } from '~/stores/connections'

export default {
  components: { Pagination, PhArrowsCounterClockwise, PhLink, PhProhibit, PhCheck, PhWarningCircle, InputGroup, Badge, DataTable, Layout, Btn },

  setup () {
    useHead({
      title: `Pending Updates | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    checked: [],
    approving: false,
    declining: false,
    retrying: false,
    filters: {
      connection: null,
      recipe: null,
      status: 'PENDING',
    },

    survivingRecords: {}, // Store surviving record data for each action

    limit: 100,
    offset: 0,
  }),

  computed: {
    ...mapState(useConnectionsStore, ['connections']),
    ...mapState(useActionsStore, ['loading', 'actions', 'total']),
    ...mapState(useRecipesStore, ['recipes', 'params']),

    headers () {
      return [
        { text: 'Action Type', value: 'recipe_name_formatted' },
        { text: 'Details', value: 'action_data' },
        ...(['ERROR', 'SUCCESS'].includes(this.filters.status) ? [{ text: 'Results', value: 'results' }] : []),
        { text: '', value: 'actions' },
      ]
    },
  },

  watch: {
    filters: {
      deep: true,
      handler (newFilters, oldFilters) {
        this.loadActions()
        // Reload recipes when connection changes
        if (newFilters.connection !== oldFilters?.connection) {
          this.getRecipesFiltered()
        }
      },
    },
  },

  async mounted () {
    await this.getConnections()
    this.setFilters()
    this.loadActions()
    this.getRecipesFiltered()
  },

  methods: {
    ...mapActions(useConnectionsStore, ['getConnections']),
    ...mapActions(useActionsStore, ['getActions', 'updateActions']),
    ...mapActions(useRecipesStore, ['getRecipes']),

    getRecipesFiltered () {
      // Pass the current connection_uuid to filter recipes
      const params = {}
      if (this.filters.connection) {
        params.connection_uuid = [this.filters.connection]
      }
      this.getRecipes(params)
    },

    setFilters () {
      const query = this.$route.query
      for (const key of Object.keys(this.filters)) {
        if (query[key]) { this.filters[key] = query[key] }
      }
      this.filters.connection = this.filters.connection || this.connections[0].uuid
    },

    updateQuery () {
      const url = new URL(window.location)
      for (const key of Object.keys(this.filters)) {
        this.filters[key] ? url.searchParams.set(key, this.filters[key]) : url.searchParams.delete(key)
      }
      window.history.pushState({}, '', url)
    },

    async loadActions (page = 1) {
      this.offset = this.limit * (page - 1)
      await this.getActions(this.filters.connection, this.filters.status, this.filters.recipe, this.limit, this.offset)
      this.checked = []
      this.survivingRecords = {} // Clear surviving records when loading new actions
      this.updateQuery()
    },

    async onApprove (actions) {
      const actionCount = actions.length
      const message = `You are about to approve ${actionCount} action${actionCount === 1 ? '' : 's'}. These records will be merged, deleted or updated according to your recipe settings. These actions cannot be undone.

Are you sure you want to proceed?`

      if (! await this.$dialog.show({
        header: 'Confirm Approval',
        message,
        okText: 'Yes, I am sure',
        cancelText: 'Cancel',
      })) {
        return
      }

      this.approving = true
      const data = actions.map(a => ({ uuid: a.uuid, status: 'APPROVED' }))
      await this.updateActions(this.filters.connection, data)
      this.approving = false
      await this.loadActions()
    },

    async onDecline (actions) {
      this.declining = true
      const data = actions.map(a => ({ uuid: a.uuid, status: 'REJECTED' }))
      await this.updateActions(this.filters.connection, data)
      this.declining = false
      await this.loadActions()
    },

    async onRetry (actions) {
      this.retrying = true
      const data = actions.map(a => ({ uuid: a.uuid, status: 'APPROVED' }))
      await this.updateActions(this.filters.connection, data)
      this.retrying = false
      await this.loadActions()
    },

    resultsFormatted (results, idx) {
      if (! results) { return }

      setTimeout(() => {
        const formatter = new JSONFormatter(results, 1, {
          theme: window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark',
        })
        this.$refs[`results-${idx}`].replaceChildren(formatter.render())
      }, 50)
    },

    isMergeAction (row) {
      // Check if this is a merge action based on recipe name or action type
      const recipeName = (row.recipe_name_formatted || '').toLowerCase()
      const actionType = (row.action_type || '').toLowerCase()

      return recipeName.includes('merge')
             || actionType.includes('merge')
             || recipeName.includes('duplicate')
             || actionType.includes('duplicate')
    },

    isPurgeAction (row) {
      // Check if this is a purge action based on recipe name or action type
      const recipeName = (row.recipe_name_formatted || '').toLowerCase()
      const actionType = (row.action_type || '').toLowerCase()

      return recipeName.includes('purge')
             || actionType.includes('purge')
    },

    getExternalLinkForId (row, id) {
      // Map ID to external source link
      if (! row.external_source_links || ! row.action_ids) {
        return null
      }

      const idIndex = row.action_ids.indexOf(id)
      if (idIndex >= 0 && idIndex < row.external_source_links.length) {
        return row.external_source_links[idIndex]
      }

      return null
    },

    getPurgeTableData (row) {
      // Transform purge action data into table format
      const tableData = []

      if (! row || ! row.all_row_json || ! Array.isArray(row.all_row_json) || row.all_row_json.length === 0) {
        return tableData
      }

      // Use the first record (purge actions typically have only one record)
      const record = row.all_row_json[0]
      const actionData = row.action_data || {}

      // Convert record to field-value pairs
      Object.keys(record).forEach((fieldName) => {
        const value = record[fieldName]
        let displayValue = this.formatFieldValue(value)
        let hasValidationIssue = false
        let validationMessage = ''

        // Check if this field has corresponding validation data in action_data
        if (actionData[fieldName] !== undefined) {
          // Check for validation details
          const validationKey = `${fieldName}_validation_details`
          if (actionData[validationKey]) {
            hasValidationIssue = true
            validationMessage = actionData[validationKey]
            // Make the original value bold and dark red
            displayValue = `<span class="font-bold text-red-800">${displayValue}</span>`
          }
        }

        tableData.push({
          field: fieldName,
          value: displayValue,
          hasValidationIssue,
          validationMessage,
          isId: fieldName.toLowerCase() === 'id',
          externalLink: fieldName.toLowerCase() === 'id' ? this.getExternalLinkForId(row, value) : null,
        })
      })

      return tableData
    },

    getMergeRecords (row) {
      // Extract the record data from all_row_json
      const records = []

      if (! row || ! row.all_row_json || ! Array.isArray(row.all_row_json)) {
        return [{}] // Return at least one empty record
      }

      // The new structure has all records directly in all_row_json array
      row.all_row_json.forEach((record) => {
        if (record && typeof record === 'object') {
          records.push(record)
        }
      })

      // Ensure we have at least 2 records for table structure (minimum 4 columns total)
      while (records.length < 2) {
        records.push({})
      }

      return records
    },

    getMergeFields (row) {
      // Transform row data into field-based structure for table rendering
      const fields = {}

      if (! row || ! row.all_row_json || ! Array.isArray(row.all_row_json)) {
        return fields
      }

      // Get all record data from all_row_json
      const records = row.all_row_json

      // Find the surviving record using action_data.surviving_record_id
      let survivingRecord = null
      if (row.action_data && row.action_data.surviving_record_id) {
        survivingRecord = records.find(record => record && record.id === row.action_data.surviving_record_id)
      }

      // Fallback to first record if surviving_record_id not found
      if (! survivingRecord && records.length > 0) {
        survivingRecord = records[0]
      }

      // Initialize surviving record for this action if not exists in component state
      if (! this.survivingRecords[row.uuid]) {
        this.survivingRecords[row.uuid] = survivingRecord ? { ...survivingRecord } : {}
      }

      // Get surviving values from action_data.surviving_values if available
      const survivingValues = (row.action_data && row.action_data.surviving_values) || {}

      // Find all unique field names across all records
      const allFieldNames = new Set()

      // Add fields from surviving record
      if (typeof survivingRecord === 'object' && survivingRecord !== null) {
        Object.keys(survivingRecord).forEach(key => allFieldNames.add(key))
      }

      // Add fields from surviving_values
      Object.keys(survivingValues).forEach(key => allFieldNames.add(key))

      // Add fields from all records
      records.forEach((record) => {
        if (record && typeof record === 'object') {
          Object.keys(record).forEach(key => allFieldNames.add(key))
        }
      })

      // Remove common metadata fields that shouldn't be displayed
      const excludeFields = ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at', '__v', '_id', 'createdbyid', 'createddate', 'lastmodifieddate', 'systemmodstamp', 'isdeleted', 'ownerid']
      excludeFields.forEach(field => allFieldNames.delete(field))

      // Build field structure
      allFieldNames.forEach((fieldName) => {
        // Determine surviving value: prioritize surviving_values, then component state, then surviving record
        let survivingValue
        if (Object.prototype.hasOwnProperty.call(survivingValues, fieldName)) {
          // Use value from action_data.surviving_values
          survivingValue = survivingValues[fieldName]
        } else if (this.survivingRecords[row.uuid] && Object.prototype.hasOwnProperty.call(this.survivingRecords[row.uuid], fieldName)) {
          // Use value from component state (user edited)
          survivingValue = this.survivingRecords[row.uuid][fieldName]
        } else {
          // Use value from the surviving record
          survivingValue = survivingRecord ? survivingRecord[fieldName] : null
        }

        fields[fieldName] = {
          surviving: this.formatFieldValue(survivingValue),
          records: records.map(record => this.formatFieldValue((record && record[fieldName]) || '')),
        }
      })

      // If no fields found, create a fallback structure
      if (Object.keys(fields).length === 0) {
        fields.Data = {
          surviving: JSON.stringify(survivingRecord),
          records: records.map(record => JSON.stringify(record)),
        }
      }

      return fields
    },

    formatFieldName (fieldName) {
      // Format field names for display
      if (! fieldName) { return '' }

      const specialCases = {
        id: 'ID',
        url: 'URL',
        email: 'Email',
        phone: 'Phone',
        fax: 'Fax',
        website: 'Website',
        linkedin: 'LinkedIn',
        facebook: 'Facebook',
        twitter: 'Twitter',
      }

      const lower = fieldName.toLowerCase()
      if (specialCases[lower]) {
        return specialCases[lower]
      }

      return fieldName.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim()
    },

    formatFieldValue (value) {
      // Format field values for display
      if (value === null || value === undefined) {
        return ''
      }
      if (typeof value === 'object') {
        return JSON.stringify(value)
      }
      return String(value)
    },

    setSurvivingValue (row, fieldName, value) {
      // Set the surviving value when clicking on a record cell
      if (! row || ! row.uuid) {
        return
      }

      // Initialize surviving record for this action if not exists
      if (! this.survivingRecords[row.uuid]) {
        // Find the surviving record using action_data.surviving_record_id
        let survivingRecord = null
        if (row.action_data && row.action_data.surviving_record_id && row.all_row_json) {
          survivingRecord = row.all_row_json.find(record => record && record.id === row.action_data.surviving_record_id)
        }
        // Fallback to first record if surviving_record_id not found
        if (! survivingRecord && row.all_row_json && row.all_row_json[0]) {
          survivingRecord = row.all_row_json[0]
        }
        this.survivingRecords[row.uuid] = survivingRecord ? { ...survivingRecord } : {}
      }

      // Set the value in the surviving record
      this.survivingRecords[row.uuid][fieldName] = value

      // Force reactivity update
      this.$forceUpdate()
    },

    updateSurvivingValue (row, fieldName, value) {
      // Update surviving value when manually editing
      if (! row || ! row.uuid) {
        return
      }

      // Initialize surviving record for this action if not exists
      if (! this.survivingRecords[row.uuid]) {
        // Find the surviving record using action_data.surviving_record_id
        let survivingRecord = null
        if (row.action_data && row.action_data.surviving_record_id && row.all_row_json) {
          survivingRecord = row.all_row_json.find(record => record && record.id === row.action_data.surviving_record_id)
        }
        // Fallback to first record if surviving_record_id not found
        if (! survivingRecord && row.all_row_json && row.all_row_json[0]) {
          survivingRecord = row.all_row_json[0]
        }
        this.survivingRecords[row.uuid] = survivingRecord ? { ...survivingRecord } : {}
      }

      // Set the value in the surviving record
      this.survivingRecords[row.uuid][fieldName] = value
    },
  },
}
</script>

<style>
.json-formatter-dark.json-formatter-row .json-formatter-string {
  @apply !whitespace-break-spaces break-all;
}

/* Merge action table styling */
.merge-table-container {
  max-width: 100%;
  overflow-x: auto;
}

.merge-table {
  width: 100%;
  table-layout: fixed;
}

/* Fixed width for Fields column (Task 5) */
.merge-table .action-fields-column {
  width: 150px;
}

/* Minimum and maximum width for Values columns (Task 6) */
.merge-table .action-values-column {
  min-width: 200px;
  max-width: 300px;
  width: auto;
}

.merge-table th:first-child,
.merge-table td:first-child {
  width: 150px; /* Fixed width for Fields column */
}

.merge-table th:nth-child(2),
.merge-table td:nth-child(2) {
  min-width: 200px; /* Minimum and maximum width for Values columns */
  max-width: 300px;
}

.merge-table th:nth-child(n+3),
.merge-table td:nth-child(n+3) {
  min-width: 200px; /* Minimum and maximum width for Values columns */
  max-width: 300px;
}

.merge-table th,
.merge-table td {
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  vertical-align: top;
  line-height: 1.4;
  padding: 8px;
}

.merge-table .surviving-input {
  width: 100%;
  word-wrap: break-word;
}

.merge-table .clickable-cell:hover {
  background-color: #eff6ff;
  transition: background-color 0.2s;
}

.dark .merge-table .clickable-cell:hover {
  background-color: #1e293b;
  transition: background-color 0.2s;
}
</style>
