<template>
  <div>
    <div class="mb-8 flex items-center gap-4">
      <div class="w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-300">
        Connection
      </div>
      <div>
        <ConnectionIcon :type="recipe.connection.connection_type" class="mr-2" />
        <span>{{ recipe.connection.name }}</span>
      </div>
    </div>

    <div v-if="form" class="mb-8 flex items-center gap-4">
      <div class="w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-300">
        Action Mode
      </div>
      <DropdownSelect
        v-model="form.automation"
        hide-search
        hide-on-click
        single
        :options="{ automatic: 'Automatic', queue: 'Queue', deactivated: 'Deactivated' }"
        :disabled="!!historyItem"
      >
        <template #placeholder>
          <ConnectionAutomationIcon :automation="form.automation" />
        </template>
        <template #item="{ option }">
          <ConnectionAutomationIcon :automation="option.value" no-tooltip />
        </template>
      </DropdownSelect>
    </div>
  </div>
</template>

<script>
import ConnectionIcon from '~/components/Connections/ConnectionIcon.vue'
import ConnectionAutomationIcon from '~/components/Connections/ConnectionAutomationIcon.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'
import DropdownSelect from '~/components/UI/DropdownSelect.vue'

export default {
  components: { DropdownSelect, ConnectionAutomationIcon, ConnectionIcon },

  mixins: [partialFormMixin],

  props: {
    recipe: { type: Object, required: true },
    historyItem: { type: Object, default: null },
  },

  emits: ['save'],

  watch: {
    'form.automation': async function (val) {
      if (! val || val === this.recipe.automation) { return }
      if (this.historyItem) { return }

      const message = {
        automatic: 'You are about to change this recipe to Automatic mode. This means all actions will be automatically applied, without any approval. Are you sure you want to make this change?',
        queue: 'You are about to change this recipe to Queue mode. This means all actions will require approval before being applied. Are you sure you want to make this change?',
        deactivated: 'You are about to deactivate this recipe. No actions will be generated. Are you sure you want to make this change?',
      }[val]

      if (! await this.$dialog.show({ header: 'Confirm', message, okText: 'Yes, I am sure' })) {
        this.form.automation = this.recipe.automation
      } else {
        this.$emit('save')
      }
    },
  },
}
</script>
