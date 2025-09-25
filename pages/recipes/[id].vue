<template>
  <Layout :crumbs="[{ label: 'Dashboard', to: '/' }, { label: recipe?.label || 'Recipe settings' }]" :loading="loading">
    <RecipeSharedHeader
      :no-permission-message="noPermissionMessage"
      :permissions="permissions"
      :recipe="recipe"
      :form-changed="formChanged"
      :updating="updating"
      :history-item="historyItem"
      @cancel="cancel"
      @submit="submit"
      @clear-history="clearHistory"
    />

    <Panel>
      <RecipeSharedFields v-model="form" :recipe="recipe" :history-item="historyItem" @save="submit" />

      <AssigmentRulesForm
        v-if="templateName?.startsWith('assign_') && form.configuration?.assignment_rules"
        v-model="form.configuration.assignment_rules"
        :permissions="permissions"
        :fields-title="noPermissionMessage"
        :columns="mergedColumns"
        :disabled="!!historyItem"
      />

      <MasterRecordRulesForm
        v-if="templateName?.startsWith('merge_') && form?.configuration?.master_record_rules"
        v-model="form.configuration.master_record_rules"
        :permissions="permissions"
        :fields-title="noPermissionMessage"
        :columns="mergedColumns"
        :disabled="!!historyItem"
        class="mb-8"
      />

      <FieldMergeRulesForm
        v-if="templateName?.startsWith('merge_') && form?.configuration?.field_merge_rules"
        v-model="form.configuration.field_merge_rules"
        :permissions="permissions"
        :fields-title="noPermissionMessage"
        :columns="mergedColumns"
        :disabled="!!historyItem"
      />

      <FormattingRulesForm
        v-if="templateName === 'formatting' && form.configuration?.formatting_rules"
        v-model="form.configuration.formatting_rules"
        :permissions="permissions"
        :columns="mergedColumns"
        :disabled="!!historyItem"
      />

      <div v-if="templateName === 'smart_classification_leads_contacts'">
        <div class="mb-4 w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-200">
          Classification Rules
        </div>
        <ClassificationRulesForm
          v-if="form.configuration && mergedColumns"
          v-model="form.configuration"
          :permissions="permissions"
          :fields-title="noPermissionMessage"
          :columns="mergedColumns"
          :disabled="!!historyItem"
        />
      </div>

      <EmailImportForm
        v-if="templateName === 'email_import_leads_contacts'"
        v-model="form.configuration"
        :permissions="permissions"
        :merged-columns="mergedColumns"
        :fields-title="noPermissionMessage"
        :columns="mergedColumns"
        :secondary-columns="secondaryColumns"
        :disabled="!!historyItem"
      />

      <div v-if="templateName === 'convert_leads_to_accounts'" class="flex items-center gap-4">
        <div class="w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-300">
          Converted Status
        </div>
        <DropdownSelect
          v-if="statusColumn && form?.configuration"
          v-model="form.configuration.converted_status"
          hide-search
          single
          placeholder="Not selected"
          :options="statusColumn.values.reduce((acc, v) => ((acc[v] = v), acc), {})"
          :disabled="!!historyItem"
        />
      </div>
    </Panel>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import Layout from '~/components/Layout/Layout.vue'
import Panel from '~/components/UI/Panel.vue'
import RecipeSharedFields from '~/components/Recipes/RecipeSharedFields.vue'
import { useHead, useRuntimeConfig } from '#imports'
import RecipeSharedHeader from '~/components/Recipes/RecipeSharedHeader.vue'
import FormattingRulesForm from '~/components/Recipes/FormattingRulesForm.vue'
import { useOrganizationsStore } from '~/stores/organization'
import AssigmentRulesForm from '~/components/Recipes/AssigmentRulesForm.vue'
import MasterRecordRulesForm from '~/components/Recipes/MasterRecordRulesForm.vue'
import FieldMergeRulesForm from '~/components/Recipes/FieldMergeRulesForm.vue'
import EmailImportForm from '~/components/Recipes/EmailImportForm.vue'
import DropdownSelect from '~/components/UI/DropdownSelect.vue'
import ClassificationRulesForm from '~/components/Recipes/ClassificationRulesForm.vue'
import { useRecipesStore } from '~/stores/recipes'
import { useConnectionsStore } from '~/stores/connections'

export default {
  components: { ClassificationRulesForm, DropdownSelect, EmailImportForm, FieldMergeRulesForm, MasterRecordRulesForm, AssigmentRulesForm, FormattingRulesForm, RecipeSharedHeader, RecipeSharedFields, Panel, Layout },

  async beforeRouteLeave () {
    if (! this.formChanged) {
      return true
    }
    return await this.$dialog.show({
      message: 'You haven\'t saved your changes. Your pending changes will be lost. Are you sure you want to leave this page?',
      okText: 'Yes, I am sure.',
      cancelText: 'Continue editing',
    })
  },

  setup () {
    useHead({
      title: `Recipe settings | ${useRuntimeConfig().public.appName}`,
    })
  },

  data: () => ({
    form: {},
  }),

  computed: {
    ...mapState(useRecipesStore, {
      recipe: 'recipe',
      loadingRecipe: 'loading',
      updating: 'updating',
      historyItem: 'historyItem',
      loadingHistoryItem: 'loadingHistoryItem',
    }),

    ...mapState(useConnectionsStore, {
      loadingColumns: 'loadingColumns',
      columns: 'columns',
      loadingAggFunctions: 'loadingAggFunctions',
      aggFunctions: 'aggFunctions',
    }),

    ...mapState(useOrganizationsStore, {
      organization: 'organization',
      permissions: s => s.organization.user_permissions.all,
    }),

    baseForm () {
      return pick(this.recipe, ['configuration', 'automation'])
    },

    formChanged () {
      const changed = ! isEqual(this.baseForm, this.form)

      if (changed) {
        window.onbeforeunload = e => ((e || window.event).returnValue = 'Unsaved')
      } else {
        window.onbeforeunload = null
      }

      return changed
    },

    loading () {
      return this.loadingRecipe || this.loadingColumns || this.loadingAggFunctions || this.loadingHistoryItem
    },

    mergedColumns () {
      return this.columns

      // if (! this.columns?.primary_tables) { return [] }
      // return Object.values(this.columns.primary_tables)
      //   .reduce((acc, tbl) => ((acc = acc.concat(tbl)), acc), [])
      //   .concat(this.columns.aggregation_functions.map(a => ({ ...a, aggregate: true })))
    },

    secondaryColumns () {
      if (! this.columns?.secondary_tables) { return [] }
      return Object.values(this.columns.secondary_tables)
        .reduce((acc, tbl) => ((acc = acc.concat(tbl)), acc), [])
    },

    noPermissionMessage () {
      return this.permissions.update ? '' : 'You have view only permissions.'
    },

    statusColumn () {
      return this.mergedColumns.find(c => c.name === 'Status')
    },

    templateName () {
      return this.recipe?.recipe_template?.name || ''
    },
  },

  watch: {
    baseForm () {
      this.resetForm()
    },

    '$route.query.history_id': function () {
      this.checkHistory()
    },
  },

  async mounted () {
    await this.getRecipe(this.$route.params.id)
    this.getColumns(this.recipe.connection, this.recipe.recipe_template.primary_tables)
    this.checkHistory()

    useHead({
      title: `${this.recipe?.label} | ${useRuntimeConfig().public.appName}`,
    })
  },

  methods: {
    ...mapActions(useConnectionsStore, ['getColumns']),
    ...mapActions(useRecipesStore, ['getRecipe', 'updateRecipe', 'getHistoryItem']),

    async checkHistory () {
      if (this.$route.query.history_id) {
        await this.getHistoryItem(this.recipe.uuid, this.$route.query.history_id)
        this.$nextTick(() => {
          this.form = pick(this.historyItem, ['configuration', 'automation'])
        })
      } else if (this.historyItem) {
        useRecipesStore().historyItem = null
      }
    },

    async submit () {
      try {
        await this.updateRecipe(this.recipe.uuid, this.form)
        this.$notify({
          title: 'Success',
          text: 'Data was saved successfully.',
          type: 'info',
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    cancel () {
      this.resetForm()
    },

    resetForm () {
      this.form = merge({}, this.baseForm)
    },

    clearHistory () {
      useRecipesStore().historyItem = null
      this.resetForm()
    },
  },
}
</script>
