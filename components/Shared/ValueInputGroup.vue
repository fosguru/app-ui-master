<template>
  <div class="w-full">
    <ToggleInput v-if="type === 'boolean'" v-model="model" :disabled="disabled" class="mt-1.5" />
    <InputGroup
      v-if="type === 'integer'"
      v-model="model"
      :max-length="-1"
      coersion="integer"
      class="w-full"
      :disabled="disabled"
    />
    <InputGroup
      v-if="type === 'number'"
      v-model="model"
      :max-length="-1"
      coersion="number"
      class="w-full"
      :disabled="disabled"
    />
    <DateInputGroup v-if="type === 'date'" v-model="model" :disabled="disabled" class="w-full" />
    <Multiselect v-if="type === 'multiselect'" v-model="model" :options="{}" :disabled="disabled" class="w-full" />
  </div>
</template>

<script>
import InputGroup from '~/components/UI/InputGroup.vue'
import ToggleInput from '~/components/UI/ToggleInput.vue'
import Multiselect from '~/components/UI/Multiselect.vue'
import DateInputGroup from '~/components/UI/DateInputGroup.vue'

export default {
  components: { DateInputGroup, Multiselect, ToggleInput, InputGroup },

  props: {
    modelValue: { type: Array, required: true },
    dataType: { type: String, required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      set (val) {
        if (! Array.isArray(val)) { val = [val] }
        this.$emit('update:modelValue', val)
      },

      get () {
        switch (this.type) {
          case 'multiselect': return this.modelValue || []
          case 'boolean': return !! this.modelValue?.[0]
          case 'integer': return Number.parseInt(this.modelValue?.[0]) || 0
          case 'number':return Number.parseFloat(this.modelValue?.[0]) || 0
          default: return this.modelValue?.[0]
        }
      },
    },

    type () {
      switch (this.dataType) {
        case 'int': return 'integer'
        case 'float': return 'number'
        case 'boolean': return 'boolean'
        case 'date': return 'date'
        case 'datetime': return 'date'
        default: return 'multiselect'
      }
    },
  },
}
</script>
