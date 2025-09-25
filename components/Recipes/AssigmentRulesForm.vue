<template>
  <div class="space-y-4">
    <Draggable v-model="form" tag="transition-group" :animation="200" handle=".handle">
      <template #item="{ element: rule, index: idx }">
        <div class="flex w-full items-center">
          <div v-if="!isDisabled" id="handle" class="mr-4">
            <PhList class="handle size-6 cursor-grab text-gray-500" />
          </div>
          <!-- Panel -->
          <div class="w-full rounded-lg border border-stone-200 bg-stone-50 p-6 dark:border-stone-600 dark:bg-stone-800">
            <div class="mb-4 font-semibold text-stone-700 dark:text-stone-200">
              Criteria
            </div>
            <div v-for="(condition, cidx) in rule.conditions" :key="cidx" class="mb-2 flex items-center gap-4">
              <div class="lseading-none w-6 text-sm font-semibold text-stone-700 dark:text-stone-200">
                {{ cidx + 1 }}
              </div>
              <ColOpValLine v-model="rule.conditions[cidx]" :columns="columns" operator-type="condition" :disabled="isDisabled" :title="fieldsTitle" />
              <button v-if="!isDisabled" class="shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" :class="rule.conditions.length < 2 ? 'invisible' : ''" @click="removeCondition(idx, cidx)">
                <PhMinus class="size-3" weight="bold" />
              </button>
            </div>
            <button v-if="!isDisabled" class="mb-4 ml-10 font-semibold text-rose-500" @click="addCondition(idx)">
              + Add condition
            </button>

            <div class="mb-4 font-semibold text-stone-700 dark:text-stone-200">
              Logic
            </div>
            <div class="mb-4 grid grid-cols-4 gap-4">
              <InputGroup
                type="select"
                :options="{ ANY: 'ANY', ALL: 'ALL', custom: 'Custom' }"
                :model-value="['ANY', 'ALL'].includes(rule.logic) ? rule.logic : 'custom'"
                :disabled="isDisabled"
                :title="fieldsTitle"
                @update:model-value="v => rule.logic = ['ANY', 'ALL'].includes(v) ? v : ''"
              />
              <InputGroup v-if="!['ANY', 'ALL'].includes(rule.logic)" v-model="rule.logic" :disabled="isDisabled" :title="fieldsTitle" />
            </div>

            <div class="mb-4 font-semibold text-stone-700 dark:text-stone-200">
              Actions
            </div>

            <div v-for="(action, aidx) in rule.actions" :key="aidx" class="mb-2 flex items-start gap-4">
              <div class="grid w-full grid-cols-3 gap-4">
                <ColumnInputGroup v-model="action.columns" :columns="columns.filter(c => c.updateable)" :disabled="isDisabled" no-reference :title="fieldsTitle" />
                <InputGroup v-model="action.value" :max-length="-1" :disabled="isDisabled" :title="fieldsTitle" />
              </div>
              <button v-if="!isDisabled" class="shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeAction(idx, aidx)">
                <PhMinus class="size-3" weight="bold" />
              </button>
            </div>
            <div v-if="!rule.actions.length" class="mb-4 italic">
              Nothing will happen when this condition is met.
            </div>
            <button v-if="!isDisabled" class="mb-4 font-semibold text-rose-500" @click="addAction(idx)">
              + Add action
            </button>
          </div>
          <!-- /Panel -->
          <button v-if="!isDisabled" class="ml-4 shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeRule(idx)">
            <PhMinus class="size-3" weight="bold" />
          </button>
        </div>
      </template>
    </Draggable>

    <button v-if="!isDisabled" class="mb-4 font-semibold text-rose-500" @click="addRule">
      + Add rule
    </button>
  </div>
</template>

<script>
import { PhList, PhMinus } from '@phosphor-icons/vue'
import merge from 'lodash/merge'
import Draggable from 'vuedraggable'
import InputGroup from '~/components/UI/InputGroup.vue'
import ColumnInputGroup from '~/components/Shared/ColumnInputGroup.vue'
import ColOpValLine from '~/components/Recipes/ColOpValLine.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'

const baseCondition = {
  columns: [],
  values: [],
  operator: '',
}

const baseAction = {
  columns: [],
  value: '',
}

const baseRule = {
  logic: 'ALL',
  actions: [],
  conditions: [],
}

export default {
  components: { ColOpValLine, Draggable, PhList, ColumnInputGroup, PhMinus, InputGroup },

  mixins: [partialFormMixin],

  props: {
    columns: { type: Array, required: true },
    permissions: { type: Object, required: true },
    fieldsTitle: { type: String, required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    partialFormArray: true,
  }),

  computed: {
    isDisabled () {
      return ! this.permissions.update || this.disabled
    },
  },

  methods: {
    addRule () {
      this.form.push({
        ...merge([], baseRule),
        actions: [merge({}, baseAction)],
        conditions: [merge({}, baseCondition)],
      })
    },

    addCondition (idx) {
      this.form[idx].conditions.push(merge({}, baseCondition))
    },

    addAction (idx) {
      this.form[idx].actions.push(merge({}, baseAction))
    },

    removeRule (idx) {
      this.form.splice(idx, 1)
    },

    removeCondition (ruleIdx, idx) {
      this.form[ruleIdx].conditions.splice(idx, 1)
    },

    removeAction (ruleIdx, idx) {
      this.form[ruleIdx].actions.splice(idx, 1)
    },
  },
}
</script>
