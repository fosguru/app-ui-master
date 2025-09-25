<template>
  <div>
    <div class="mb-4 flex gap-4 text-sm">
      <div class="w-16 shrink-0">
        Required
      </div>
      <div class="grid w-full grid-cols-3 gap-4">
        <div>
          Column Name (e.g. Alias)
        </div>
        <div>
          Mapped Field(s)
        </div>
        <div>
          Update Options
        </div>
      </div>
      <div class="w-6" />
    </div>

    <div v-for="(mapping, idx) in form" :key="idx" class="mb-2 flex items-start gap-4">
      <div class="w-16 shrink-0">
        <ToggleInput v-model="mapping.is_required" class="mt-1.5" :disabled="disabled" :title="fieldsTitle" />
      </div>
      <ColOpValLine
        v-model="form[idx]"
        :columns="columns"
        :disabled="disabled"
        :title="fieldsTitle"
        class="grid-cols-4"
        :operator-type="operatorType"
        no-reference
      >
        <template #prepend>
          <Multiselect v-model="mapping.column_header_aliases" :disabled="disabled" :options="mapping.column_header_aliases.reduce((acc, v) => ((acc[v] = v), acc), {})" />
        </template>
      </ColOpValLine>
      <button v-if="form.length > 1 && !disabled" class="mt-2 shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeCondition(idx)">
        <PhMinus class="size-3" weight="bold" />
      </button>
    </div>
    <button v-if="!disabled" class="font-semibold text-rose-500" @click="addCondition">
      + Add mapping
    </button>
  </div>
</template>

<script>
import { PhMinus } from '@phosphor-icons/vue'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import ToggleInput from '~/components/UI/ToggleInput.vue'
import Multiselect from '~/components/UI/Multiselect.vue'
import ColOpValLine from '~/components/Recipes/ColOpValLine.vue'

const baseMapping = {
  column_header_aliases: [],
  columns: [],
  values: [],
  operator: '',
  is_required: true,
}

export default {
  components: { ColOpValLine, Multiselect, ToggleInput, PhMinus },

  props: {
    modelValue: { type: Array, required: true },
    columns: { type: Array, required: true },
    operatorType: { type: String, required: true },
    permissions: { type: Object, required: true },
    fieldsTitle: { type: String, required: true },
  },

  emits: ['update:modelValue'],

  data: () => ({
    form: [],
  }),

  computed: {
    disabled () {
      return ! this.permissions.update
    },
  },

  watch: {
    modelValue: {
      deep: true,
      handler (val) {
        if (isEqual(this.form, val)) { return }
        this.form = merge([], this.modelValue)
      },
    },

    form: {
      deep: true,
      handler (val) {
        this.$emit('update:modelValue', merge([], val))
      },
    },
  },

  mounted () {
    this.form = merge([], this.modelValue)
  },

  methods: {
    addCondition () {
      this.form.push(merge({}, baseMapping))
    },

    removeCondition (idx) {
      this.form.splice(idx, 1)
    },
  },
}
</script>
