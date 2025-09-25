<template>
  <Dropdown v-model="opened" class="inline-flex" :inline="inline">
    <template #button>
      <InputGroup
        v-bind="$omit($attrs, 'class')"
        :class="`${inputClass} w-full`"
        type="datetime-local"
        :model-value="dayjs(modelValue).format('YYYY-MM-DDTHH:mm')"
        no-error-icon
        :disabled="disabled"
        :view-only="viewOnly"
        @focus="opened = true"
        @update:model-value="onInput"
      >
        <template #append>
          <button class="block" :class="inputDisabled ? 'cursor-not-allowed' : ''" @click="inputDisabled || (opened = !opened)">
            <ChevronDownIcon class="size-4 text-gray-600" />
          </button>
        </template>
        <template v-for="(index, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
      </InputGroup>
    </template>
    <div class="flex items-center">
      <v-date-picker
        :model-value="modelValue"
        mode="dateTime"
        @update:model-value="onPickerInput"
      />
    </div>
  </Dropdown>
</template>

<script>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import InputGroup from '@/components/UI/InputGroup'
import Dropdown from '@/components/UI/Dropdown'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon'

dayjs.extend(advancedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  components: { ChevronDownIcon, Dropdown, InputGroup },

  props: {
    modelValue: { type: String, default: null },
    placeholder: { type: String, default: 'Price' },
    inputClass: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DDTHH:mm:ss[Z]' },
    inline: Boolean,
    disabled: { type: Boolean, default: false },
    viewOnly: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  data: () => ({
    opened: false,
  }),

  computed: {
    inputDisabled () {
      return this.disabled || this.viewOnly
    },
  },

  methods: {
    dayjs,

    onInput (val) {
      const date = dayjs(val)
      if (! date.isValid()) {
        this.$emit('update:modelValue', null)
      } else {
        this.$emit('update:modelValue', date.format(this.format))
      }
    },

    onPickerInput (val) {
      if (! val) {
        this.$emit('update:modelValue', null)
      } else {
        this.$emit('update:modelValue', dayjs(val).tz('UTC').format(this.format))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vc-container { border: 0; }
:deep() {
  input[type="datetime-local"]::-webkit-inner-spin-button,
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
}
</style>
