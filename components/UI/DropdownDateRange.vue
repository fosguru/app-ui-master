<template>
  <Dropdown v-model="opened" class="inline-block" :inline="inline">
    <template #button>
      <InputGroup v-bind="$attrs" :class="inputClass" :disabled="disabled" :view-only="viewOnly" no-error-icon>
        <template #input>
          <div class="flex min-w-0 max-w-full items-center" :class="inputDisabled ? 'cursor-not-allowed' : 'cursor-pointer'" @click="inputDisabled || (opened = !opened)">
            <div class="mr-2 max-w-full truncate text-sm">
              {{ dayjs(modelValue.start).tz('UTC').format('Do MMM YYYY') }} - {{ dayjs(modelValue.end).tz('UTC').format('Do MMM YYYY') }}
              ({{ dayjs(modelValue.start).tz('UTC').format('ha') }} - {{ dayjs(modelValue.end).tz('UTC').format('ha') }})
            </div>
            <ChevronDownIcon class="ml-2 size-4 text-gray-600" />
          </div>
        </template>
        <template v-for="(index, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
      </InputGroup>
    </template>
    <div class="flex items-center">
      <v-date-picker
        ref="calendar"
        :model-value="getValue()"
        mode="dateTime"
        is-range
        @update:model-value="v => $emit('update:modelValue', v)"
      />
      <div class="flex flex-col gap-2 whitespace-nowrap p-2">
        <Btn class="w-full justify-center" color="white" @click="update(today)">
          Today
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(yesterday)">
          Yesterday
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(thisWeek)">
          This Week
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(lastWeek)">
          Last Week
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(thisMonth)">
          This Month
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(lastMonth)">
          Last Month
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(thisYear)">
          This Year
        </Btn>
        <Btn class="w-full justify-center" color="white" @click="update(lastYear)">
          Last Year
        </Btn>
      </div>
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
import Btn from '@/components/UI/Btn'

dayjs.extend(advancedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  components: { Btn, ChevronDownIcon, Dropdown, InputGroup },

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
  }),

  computed: {
    today () {
      return {
        start: dayjs().startOf('day'),
        end: dayjs().endOf('day'),
      }
    },

    yesterday () {
      return {
        start: dayjs().subtract(1, 'day').startOf('day'),
        end: dayjs().subtract(1, 'day').endOf('day'),
      }
    },

    thisWeek () {
      return {
        start: dayjs().startOf('week'),
        end: dayjs().endOf('week'),
      }
    },

    lastWeek () {
      return {
        start: dayjs().subtract(1, 'week').startOf('week'),
        end: dayjs().subtract(1, 'week').endOf('week'),
      }
    },

    thisMonth () {
      return {
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month'),
      }
    },

    lastMonth () {
      return {
        start: dayjs().subtract(1, 'month').startOf('month'),
        end: dayjs().subtract(1, 'month').endOf('month'),
      }
    },

    thisYear () {
      return {
        start: dayjs().startOf('year'),
        end: dayjs().endOf('year'),
      }
    },

    lastYear () {
      return {
        start: dayjs().subtract(1, 'year').startOf('year'),
        end: dayjs().subtract(1, 'year').endOf('year'),
      }
    },

    inputDisabled () {
      return this.disabled || this.viewOnly
    },
  },

  methods: {
    dayjs,

    getValue () {
      if (! this.modelValue) { return { start: null, end: null } }

      return {
        start: dayjs.tz(this.modelValue.start, dayjs.tz.guess()).toDate(),
        end: dayjs.tz(this.modelValue.end, dayjs.tz.guess()).toDate(),
      }
    },

    update (range) {
      this.$emit('update:modelValue', range)
      this.$refs.calendar.move(range.start.toDate())
    },
  },
}
</script>
