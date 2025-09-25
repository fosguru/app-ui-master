<template>
  <div>
    <div class="mb-4 flex gap-4 text-sm">
      <div class="grid w-full grid-cols-3 gap-4">
        <div>
          Fields
        </div>
        <div>
          Format Options
        </div>
      </div>
      <div class="w-6" />
    </div>

    <div v-for="(mapping, idx) in form" :key="idx" class="mb-2 flex items-start gap-4">
      <ColOpValLine
        v-model="form[idx]"
        :columns="columns"
        :disabled="isDisabled"
        :operator-type="operatorType"
        no-reference
      />
      <button v-if="form.length > 1 && !isDisabled" class="mt-2 shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="removeRule(idx)">
        <PhMinus class="size-3" weight="bold" />
      </button>
    </div>
    <button v-if="!isDisabled" class="font-semibold text-rose-500" @click="addRule">
      + Add formatting rule
    </button>
  </div>
</template>

<script>
import { PhMinus } from '@phosphor-icons/vue'
import merge from 'lodash/merge'
import ColOpValLine from '~/components/Recipes/ColOpValLine.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'

const baseMapping = {
  columns: [],
  operator: '',
}

export default {
  components: { ColOpValLine, PhMinus },

  mixins: [partialFormMixin],

  props: {
    columns: { type: Array, required: true },
    operatorType: { type: String, default: 'format' },
    permissions: { type: Object, required: true },
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
      this.form.push(merge({}, baseMapping))
    },

    removeRule (idx) {
      this.form.splice(idx, 1)
    },
  },
}
</script>
