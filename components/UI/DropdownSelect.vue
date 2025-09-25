<template>
  <Dropdown v-model="opened">
    <template #button>
      <InputGroup v-bind="$attrs" :class="inputClass" :disabled="disabled" :view-only="viewOnly">
        <template #input="{ id }">
          <button :id="id" class="flex w-full items-center" :class="inputDisabled ? 'cursor-not-allowed' : ''" @click="inputDisabled || (opened = !opened)">
            <span class="flex w-full items-center">
              <slot name="placeholder">
                <span>{{ single ? options[modelValue] || placeholder : placeholder }}</span>
              </slot>
              <Badge v-if="!single" class="ml-2 mt-0.5 bg-gray-100 uppercase dark:bg-stone-600" :text="modelValue && modelValue.length" />
            </span>
            <ChevronDownIcon class="ml-2 size-4 text-gray-600" />
          </button>
        </template>
        <template v-for="(index, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
      </InputGroup>
    </template>
    <div class="max-h-80">
      <div v-if="!hideSearch" class="p-1">
        <InputGroup v-model="search" no-error-icon placeholder="Search" class="w-full" />
      </div>
      <DropdownMenuItem
        v-for="option in filteredOptions"
        :key="option.value"
        @click="toggle(option.value)"
      >
        <Checkbox :model-value="single ? modelValue === option.value : modelValue && modelValue.includes(option.value)" class="pointer-events-none mr-2" />
        <slot name="item" :option="option">
          <span v-html="option.label" />
        </slot>
      </DropdownMenuItem>
    </div>
  </Dropdown>
</template>

<script>
import remove from 'lodash/remove'
import reduce from 'lodash/reduce'
import Fuse from 'fuse.js'
import isArray from 'lodash/isArray'
import InputGroup from '@/components/UI/InputGroup'
import Dropdown from '@/components/UI/Dropdown'
import DropdownMenuItem from '@/components/UI/DropdownMenuItem'
import Badge from '@/components/UI/Badge'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'
import fuseHighlight from '@/utils/fuse-highlight'
import Checkbox from '@/components/UI/Checkbox'

export default {
  components: { Checkbox, ChevronDownIcon, Badge, DropdownMenuItem, Dropdown, InputGroup },

  props: {
    modelValue: { type: [Array, String], required: true },
    options: { type: [Object, Array], required: true },
    placeholder: { type: String, default: 'Pick some' },
    inputClass: { type: String, default: '' },
    hideSearch: Boolean,
    single: Boolean,
    disabled: Boolean,
    viewOnly: { type: Boolean, default: false },
    hideOnClick: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    opened: false,
    search: '',
    fuse: null,
  }),

  computed: {
    filteredOptions () {
      if (! this.search) {
        return this.transformedOptions
      }

      return this.fuse.search(this.search).map(i => fuseHighlight(i))
    },

    transformedOptions () {
      if (isArray(this.options)) { return this.options }
      return reduce(this.options, (acc, v, k) => (acc.push({ label: v, value: k }), acc), [])
    },

    inputDisabled () {
      return this.disabled || this.viewOnly
    },
  },

  mounted () {
    this.fuse = new Fuse(this.transformedOptions, {
      includeMatches: true,
      threshold: 0.3,
      keys: ['label'],
    })
  },

  methods: {
    toggle (key) {
      if (this.single) {
        this.$emit('update:modelValue', key)
        if (this.hideOnClick) { this.opened = false }
        return
      }

      if (this.modelValue.includes(key)) {
        this.$emit('update:modelValue', remove(this.modelValue, k => k !== key))
      } else {
        this.$emit('update:modelValue', [...this.modelValue, key])
      }
    },
  },
}
</script>
