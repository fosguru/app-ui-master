<template>
  <div>
    <div class="mb-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
      Surviving Record Rules
    </div>

    <Draggable v-model="form" tag="transition-group" :animation="200" handle=".handle">
      <template #item="{ index: idx }">
        <div class="mb-2 flex items-start gap-4">
          <div v-if="!isDisabled" id="handle" class="mt-2">
            <PhList class="handle size-6 cursor-grab text-gray-500" />
          </div>
          <ColOpValLine
            v-model="form[idx]"
            :columns="columns"
            :selected-columns="selectedColumns"
            :disabled="isDisabled"
            operator-type="select_master_record"
            :title="fieldsTitle"
          />
          <button v-if="form.length > 1 && !isDisabled" class="mt-2 shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeCondition(idx)">
            <PhMinus class="size-3" weight="bold" />
          </button>
        </div>
      </template>
    </Draggable>
    <button v-if="!isDisabled" class="font-semibold text-rose-500" @click="addCondition">
      + Add surviving record rule
    </button>
  </div>
</template>

<script>
import { PhList, PhMinus } from '@phosphor-icons/vue'
import merge from 'lodash/merge'
import Draggable from 'vuedraggable'
import ColOpValLine from '~/components/Recipes/ColOpValLine.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'

const baseCondition = {
  columns: [],
  values: [],
  operator: 'CONTAINS',
}

export default {
  components: { ColOpValLine, PhList, Draggable, PhMinus },

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
