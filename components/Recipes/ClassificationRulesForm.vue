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
            <div v-for="(condition, cidx) in rule.conditions" :key="cidx" class="mb-2 flex items-center gap-4">
              <div class="mt-3 w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-200">
                <span v-if="cidx === 0">If</span>
                <span v-else>And</span>
              </div>
              <ColOpValLine v-model="rule.conditions[cidx]" :columns="columns" operator-type="condition" :disabled="isDisabled" :title="fieldsTitle" />
              <button v-if="rule.conditions.length > 1 && !isDisabled" class="shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeCondition(idx, cidx)">
                <PhMinus class="size-3" weight="bold" />
              </button>
            </div>
            <button v-if="!isDisabled" class="mb-4 ml-36 font-semibold text-rose-500" @click="addCondition(idx)">
              + Add condition
            </button>

            <div class="flex items-start gap-4">
              <div class="mt-3 w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-200">
                Set
              </div>
              <div class="grid w-full grid-cols-3 gap-4">
                <ColumnInputGroup v-model="rule.actions[0].columns" :columns="columns.filter(c => c.updateable)" :disabled="isDisabled" />
                <InputGroup v-model="rule.actions[0].value" :max-length="-1" :disabled="isDisabled" />
              </div>
            </div>
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
  value: '',
  columns: [],
}

const baseRule = {
  logic: 'all',
  actions: [],
  conditions: [],
}

export default {
  components: { ColOpValLine, PhList, Draggable, ColumnInputGroup, PhMinus, InputGroup },

  mixins: [partialFormMixin],

  props: {
    modelValue: { type: Array, required: true },
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

    removeRule (idx) {
      this.form.splice(idx, 1)
    },

    removeCondition (ruleIdx, idx) {
      this.form[ruleIdx].conditions.splice(idx, 1)
    },
  },
}
</script>
