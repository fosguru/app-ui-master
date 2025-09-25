<template>
  <div>
    <div v-if="title" class="mb-4 w-36 text-sm font-semibold leading-none text-stone-700 dark:text-stone-200">
      {{ title }}
    </div>

    <div v-for="(condition, idx) in form" :key="idx" class="mb-2">
      <div class="flex items-start gap-4">
        <slot name="prependItem" />
        <ColOpValLine
          v-model="form[idx]"
          :columns="columns"
          :selected-columns="selectedColumns"
          :disabled="isDisabled"
          operator-type="merge_values"
          :title="fieldsTitle"
        />
        <button v-if="form.length > 1 && !isDisabled" class="mt-2 shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeCondition(idx)">
          <PhMinus class="size-3" weight="bold" />
        </button>
      </div>
      <div v-if="condition.sub_rules" class="mb-4 mt-3 pl-10">
        <FieldMergeRulesForm
          v-model="condition.sub_rules"
          :permissions="permissions"
          :fields-title="fieldsTitle"
          :disabled="isDisabled"
          :columns="columns"
          title=""
        >
          <template #prependItem>
            <PhArrowElbowDownRight class="size-8" weight="thin" />
          </template>
        </FieldMergeRulesForm>
      </div>
    </div>
    <button v-if="!isDisabled" class="font-semibold text-rose-500" @click="addCondition">
      + Add merge rule
    </button>
  </div>
</template>

<script>
import { PhArrowElbowDownRight, PhMinus } from '@phosphor-icons/vue'
import merge from 'lodash/merge'
import ColOpValLine from '~/components/Recipes/ColOpValLine.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'

const baseCondition = {
  columns: [],
  values: [],
  operator: 'CONTAINS',
}

export default {
  name: 'FieldMergeRulesForm',

  components: { ColOpValLine, PhArrowElbowDownRight, PhMinus },

  mixins: [partialFormMixin],

  props: {
    title: { type: String, default: 'Field Merge rules' },
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

    selectedColumns () {
      return this.modelValue.reduce((acc, val) => ((acc = acc.concat(val.columns)), acc), [])
    },
  },

  methods: {
    addCondition () {
      this.form.push(merge({}, baseCondition))
    },

    removeCondition (idx) {
      this.form.splice(idx, 1)
    },
  },
}
</script>
