import { configure, defineRule } from 'vee-validate'

// eslint-disable-next-line camelcase
import { max, max_value, min, min_value, numeric, required } from '@vee-validate/rules'
import dayjs from 'dayjs'
import { localize } from '@vee-validate/i18n'
import { defineNuxtPlugin } from '#imports'

defineRule('required', required)
defineRule('numeric', numeric)
defineRule('min', min)
defineRule('max', max)
defineRule('min_value', min_value)
defineRule('max_value', max_value)
defineRule('time', value => dayjs(`2000-01-01 ${value}`).isValid())
defineRule('time_after', (value, [target]) => {
  return dayjs(`2000-01-01 ${value}`).isAfter(dayjs(`2000-01-01 ${target}`))
})
defineRule('time_before', (value, [target]) => dayjs(`2000-01-01 ${value}`).isBefore(dayjs(`2000-01-01 ${target}`)))

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'This field is required.',
        numeric: 'The {_field_} accepts only numeric value.',
        min: 'The {_field_} must not be smaller than {length}.',
        max: 'The {_field_} must not be greater than {length}.',
        min_value: 'The {_field_} must not be smaller than {min}.',
        max_value: 'The {_field_} must not be greater than {max}.',
        time: 'Time is not valid.',
        time_after: 'The {_field_} must be after {target}.',
        time_before: 'The {_field_} must be before {target}.',
      },
    },
  }),
})

export default defineNuxtPlugin(() => {})
