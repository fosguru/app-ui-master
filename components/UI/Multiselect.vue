<template>
  <InputGroup v-bind="$attrs" :loading="loading" :disabled="disabled">
    <template #input>
      <VueMultiselect
        v-bind="$attrs"
        v-model="completeValue"
        :options="optionsArray"
        class="w-full"
        track-by="value"
        label="label"
        :multiple="multiple"
        :taggable="taggable"
        :searchable="true"
        :show-labels="false"
        :close-on-select="!multiple"
        tag-placeholder="Please enter to add"
        :disabled="disabled"
        @tag="addOption"
      />
    </template>
    <template v-for="(index, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </InputGroup>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import InputGroup from '@/components/UI/InputGroup'
import 'vue-multiselect/dist/vue-multiselect.css'

export default {
  components: { InputGroup, VueMultiselect },

  props: {
    modelValue: { type: Array, default: null },
    options: { type: [Object, Array], required: true },
    taggable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: true },
    loading: Boolean,
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  computed: {
    optionsArray () {
      if (this.options?.constructor === Object) {
        return Object.keys(this.options).map(k => ({ label: this.options[k], value: k }))
      }
      return this.options
    },

    completeValue: {
      get () {
        if (this.multiple) {
          return this.modelValue
            .map(val => this.optionsArray.find(option => option.value === val) || ({ value: val, label: val }))
        }
        return { value: this.modelValue, label: this.modelValue }
      },

      set (val) {
        this.$emit('update:modelValue', this.multiple ? val.map(v => v.value) : (val?.value || null))
      },
    },
  },

  methods: {
    addOption (val) {
      this.$emit('update:modelValue', [...this.modelValue, val])
    },
  },
}
</script>

<style lang="scss">
  .multiselect {
    min-height: 0
  }
  .multiselect__tags {
    @apply min-h-0 border-0 bg-transparent;
    padding: 0 25px 0 0;
  }
  .multiselect--active.multiselect--above .multiselect__tags {
    @apply pt-2;
  }
  .multiselect__select {
    height: 22px;
    width: 22px;
  }
  .multiselect__content-wrapper {
    @apply border border-black dark:bg-stone-800 dark:border-stone-600;
    margin: 0 -13px;
    width: calc(100% + 26px);
  }
  .multiselect__tags-wrap {
    @apply flex flex-wrap;
    margin-top: -1px;
    margin-bottom: -6px;
  }
  .multiselect__input {
    @apply text-sm mt-1 mb-1 dark:bg-stone-800 dark:text-stone-200 dark:placeholder-stone-400;
  }
  .multiselect__tag {
    @apply bg-red-50 text-red-800 font-medium dark:bg-red-950 dark:text-red-200;
  }
  .multiselect__tag-icon:after {
    @apply text-red-400 dark:text-red-200;
  }
  .multiselect__placeholder {
    margin-bottom: 0;
  }
  .multiselect__option {
    @apply text-sm min-h-0 py-1 px-2 dark:text-stone-200;
  }
  .multiselect__option::after {
    @apply bg-red-400 text-white dark:bg-red-800 dark:text-stone-600;
    line-height: 28px;
  }
  .multiselect__option--highlight {
    @apply bg-red-400 dark:bg-red-500 dark:text-red-100;
  }
  .multiselect__option--selected {
    @apply dark:bg-red-700 dark:text-red-200;
  }
  .multiselect--disabled {
    @apply bg-transparent;
  }
  .multiselect--disabled .multiselect__current, .multiselect--disabled .multiselect__select {
    @apply bg-transparent;
  }
  .multiselect__single {
    @apply mb-0 text-sm overflow-hidden dark:bg-red-950 dark:text-red-200;;
  }
</style>
