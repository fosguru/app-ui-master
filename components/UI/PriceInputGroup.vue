<template>
  <InputGroup v-bind="$attrs" :id="id" :disabled="disabled" :view-only="viewOnly">
    <template #input>
      <ClientOnly>
        <VueNumberFormat
          :id="id"
          ref="input"
          class="w-full focus:outline-none"
          :class="$attrs.inputClass"
          :value="modelValue"
          :options="mergedOptions"
          @update:value="i => $emit('update:modelValue', i)"
        />
      </ClientOnly>
    </template>
    <template v-for="(index, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </InputGroup>
</template>

<script>
import merge from 'lodash/merge'
import VueNumberFormat from 'vue-number-format'
import InputGroup from '@/components/UI/InputGroup'

const defaultOptions = {
  precision: 2,
  prefix: '$ ',
  suffix: '',
  decimal: '.',
  thousand: ',',
  acceptNegative: false,
  isInteger: false,
}

export default {
  components: { InputGroup, VueNumberFormat },

  props: {
    id: { type: String, default: undefined },
    modelValue: { type: [String, Number], default: null },
    options: { type: Object, default: () => ({}) },
    viewOnly: Boolean,
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  computed: {
    mergedOptions () {
      return merge({}, defaultOptions, this.options)
    },
  },

  watch: {
    viewOnly () {
      this.setDisabled()
    },

    disabled () {
      this.setDisabled()
    },
  },

  updated () {
    this.setDisabled()
  },

  methods: {
    setDisabled () {
      // A workaround to set disabled attribute on input
      if (this.disabled || this.viewOnly) {
        this.$refs.input.$el.setAttribute('disabled', '')
      } else {
        this.$refs.input.$el.removeAttribute('disabled')
      }
    },
  },
}
</script>
