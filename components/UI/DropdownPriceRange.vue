<template>
  <Dropdown v-model="opened" class="inline-block" :inline="inline">
    <template #button>
      <InputGroup v-bind="$attrs" :class="inputClass" :disabled="disabled" :view-only="viewOnly">
        <template #input="{ id }">
          <button :id="id" class="flex w-full items-center" :class="inputDisabled ? 'cursor-not-allowed' : ''" @click="inputDisabled || (opened = !opened)">
            <span class="flex w-full items-center">
              <span class="block">{{ placeholder }}</span>
              <span class="ml-1 block">${{ (modelValue.from / 100).toFixed(2) }}</span>
              <span class="ml-1 block">-</span>
              <span class="ml-1 block">${{ (modelValue.to / 100).toFixed(2) }}</span>
            </span>
            <ChevronDownIcon class="ml-2 size-4 text-gray-600" />
          </button>
        </template>
        <template v-for="(index, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
      </InputGroup>
    </template>
    <div class="flex items-center space-x-2" :class="inline ? '' : 'p-2'">
      <PriceInputGroup v-model="form.from" no-error-icon class="w-32" />
      <div>to</div>
      <PriceInputGroup v-model="form.to" no-error-icon class="w-32" />
    </div>
  </Dropdown>
</template>

<script>
import InputGroup from '@/components/UI/InputGroup'
import Dropdown from '@/components/UI/Dropdown'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'
import PriceInputGroup from '@/components/UI/PriceInputGroup'

export default {
  components: { PriceInputGroup, ChevronDownIcon, Dropdown, InputGroup },

  props: {
    modelValue: { type: Object, required: true },
    placeholder: { type: String, default: 'Price' },
    inputClass: { type: String, default: '' },
    inline: Boolean,
    disabled: { type: Boolean, default: false },
    viewOnly: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  data: () => ({
    opened: false,
    form: {
      from: 0,
      to: 0,
    },
  }),

  computed: {
    inputDisabled () {
      return this.disabled || this.viewOnly
    },
  },

  watch: {
    value (val) {
      this.form = { from: val.from / 100, to: val.to / 100 }
    },

    opened (val) {
      if (! val) {
        // Don't update if values are not changed
        if (this.modelValue.from === this.form.from * 100 && this.modelValue.to === this.form.to * 100) { return }
        this.$emit('update:modelValue', { from: this.form.from * 100, to: this.form.to * 100 })
      }
    },
  },

  mounted () {
    this.form = { from: this.modelValue.from / 100, to: this.modelValue.to / 100 }
  },
}
</script>
