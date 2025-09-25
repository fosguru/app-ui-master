<template>
  <div class="flex flex-col">
    <div
      v-if="label || $slots.label || showCounter"
      class="mb-1 flex justify-between text-sm"
      :class="disabled ? 'text-gray-400' : 'text-gray-700 dark:text-stone-200'"
    >
      <label v-if="label || $slots.label" id="label" :for="id" class="align-start label flex flex-1 items-center gap-2 font-medium">
        {{ label }}
        <slot name="label" />
        <Badge v-if="optional" size="xs" class="bg-gray-100 uppercase text-gray-600" text="Optional" />
        <span v-if="helpTooltip" v-tooltip="helpTooltip" class="inline-flex size-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700">?</span>
      </label>
      <div v-if="showCounter && typeof modelValue === 'string'" class="font-medium">
        {{ modelValue.length }}/{{ maxLength }}
      </div>
    </div>
    <div class="flex">
      <div
        class="relative flex w-full items-center rounded-md border px-3 py-2 text-sm ring-offset-0 focus-within:ring-1"
        :class="[inputTheme, wrapperClass, { 'text-gray-400 dark:text-stone-500': disabled, 'cursor-not-allowed': disabled }]"
      >
        <div v-if="$slots.prepend" class="pr-3">
          <slot name="prepend" />
        </div>
        <slot name="input" v-bind="{ id }">
          <BaseSelect
            v-if="type === 'select'"
            :id="id"
            v-bind="inpubBind"
            ref="input"
            :model-value="formattedValue"
            :placeholder="placeholder"
            :options="options"
            :class="[inputClass]"
            class="cursor-inherit w-full appearance-none focus:outline-none"
            :disabled="disabled"
            :name="name"
            @update:model-value="v => input(v)"
          />
          <textarea
            v-else-if="type === 'textarea'"
            :id="id"
            v-bind="inpubBind"
            ref="input"
            :rows="rows"
            :value="formattedValue"
            :placeholder="placeholder"
            :class="[inputClass]"
            class="cursor-inherit w-full appearance-none bg-transparent focus:outline-none"
            :disabled="disabled"
            :name="name"
            @input="input($event.target.value)"
          />
          <input
            v-else
            :id="id"
            v-bind="inpubBind"
            ref="input"
            :type="type"
            :value="formattedValue"
            :placeholder="placeholder"
            :class="[inputClass]"
            class="cursor-inherit h-5 w-full appearance-none focus:outline-none"
            :disabled="disabled"
            :name="name"
            @input="input($event.target.value)"
          >
        </slot>
        <div v-if="$slots.append" class="pl-3">
          <slot name="append" />
        </div>
        <SpinnerIcon v-if="loading" class="ml-2 size-4 shrink-0" />
      </div>
    </div>
    <div v-if="errorMsg" class="mt-2">
      <div class="text-sm text-red-500">
        {{ errorMsg }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import omit from 'lodash/omit'
import BaseSelect from '@/components/UI/BaseSelect'
import Badge from '@/components/UI/Badge'
import SpinnerIcon from '@/components/Icons/SpinnerIcon.vue'

export default {
  components: { SpinnerIcon, Badge, BaseSelect },

  props: {
    id: { type: String, default: () => uuidv4() },
    modelValue: { type: [String, Number, Object, Boolean], default: null },
    label: { type: String, default: null },
    error: { type: String, default: null },
    errors: { type: Array, default: null },
    name: { type: Array, default: null },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    inputClass: { type: String, default: '' },
    wrapperClass: { type: String, default: '' },
    disabled: Boolean,
    options: { type: Object, default: null },
    rows: { type: Number, default: 3 },
    coersion: { type: String, default: null },
    maxLength: { type: [String, Number], default: 255 },
    maxDecimals: { type: Number, default: null },
    helpTooltip: { type: String, default: '' },
    showCounter: Boolean,
    emptyToNull: Boolean,
    optional: Boolean,
    loading: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    tempDecimal: false, // Workaround to keep dot in the end for decimal numbers
  }),

  computed: {
    inpubBind () {
      return omit(this.$attrs, ['class'])
    },

    inputTheme () {
      const defaultDisabledClass = `${this.disabled ? 'bg-gray-100 dark:bg-stone-600' : 'bg-white dark:bg-stone-800'}`
      if (this.errorMsg) {
        return `${defaultDisabledClass} text-red-900 border-red-300 dark:border-red-700 dark:text-red-300 focus-within:border-red-500 focus-within:ring-red-500`
      } else {
        return `${defaultDisabledClass} border-gray-300 dark:border-stone-600 dark:text-stone-200 focus-within:border-black focus-within:ring-black`
      }
    },

    formattedValue () {
      if (this.coersion === 'datetime') {
        const date = dayjs(this.modelValue)
        return date.isValid() ? date.format('YYYY-MM-DDTHH:mm') : this.modelValue
      }

      // Workaround for select null value
      if (this.type === 'select' && this.modelValue === null) {
        return 'null'
      }

      return this.modelValue + (this.tempDecimal ? '.' : '')
    },

    errorMsg () {
      return this.error || (this.errors && this.errors[0])
    },
  },

  methods: {
    input (val) {
      // Workaround for select null, bool values
      if (this.type === 'select') {
        if (val === 'null') { val = null }
        if (val === 'false') { val = false }
        if (val === 'true') { val = true }
      }

      if (this.emptyToNull && val === '') {
        this.$emit('update:modelValue', null)
        return
      }

      if (this.coersion === 'number' || this.coersion === 'integer') {
        val = val.replace(/[.](?!\d*$)/g, '') // Remove extra dots
        this.tempDecimal = this.coersion === 'number' && val.endsWith('.') // Workaround to keep dot in the end
        val = Number(val)
        if (Number.isNaN(val)) { val = 0 }
        if (this.coersion === 'integer') { val = Math.floor(val) }
        if (this.maxDecimals !== null) { val = Math.floor(val * this.maxDecimals * 10) / this.maxDecimals / 10 }
      }

      if (this.coersion === 'datetime') {
        const date = dayjs(val, 'YYYY-MM-DDTHH:mm')
        val = date.isValid() ? date.format('YYYY-MM-DDTHH:mm:ss[Z]') : val
      }

      // Max string length
      if (! this.coersion && typeof val === 'string') {
        if (this.maxLength !== -1 && val.length > this.maxLength) { val = val.substring(0, this.maxLength) }
      }

      this.$emit('update:modelValue', val)

      this.$nextTick(() => {
        // A workaround for an issue with field not updating with the latest value, so we update it manually
        if (this.$refs.input) { this.$refs.input.value = this.formattedValue }
      })
    },

    focus () {
      if (this.type === 'select') {
        this.$refs.input.$refs.select.focus()
      } else {
        this.$refs.input.focus()
      }
    },
  },
}
</script>

<style>
.cursor-inherit{
  cursor:inherit
}
</style>
