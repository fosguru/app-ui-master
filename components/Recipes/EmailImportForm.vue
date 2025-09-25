<template>
  <div v-if="form">
    <div class="mb-8">
      <div class="mb-4 text-sm font-semibold text-stone-700">
        Column / Field Mapping
      </div>
      <ColumnFieldMappingForm
        v-if="form.column_field_mapping && columns"
        v-model="form.column_field_mapping"
        operator-type="import_updates"
        :permissions="permissions"
        :fields-title="fieldsTitle"
        :columns="columns"
        :disabled="disabled"
      />
    </div>

    <div class="mb-8">
      <div class="mb-4 text-sm font-semibold text-stone-700">
        Campaigns & Campaign Members
      </div>

      <RadioInput v-model="campaignRadio" class="mb-2" value="not_add" :disabled="!permissions.update || disabled">
        Do not add to Campaigns
      </RadioInput>
      <RadioInput v-model="campaignRadio" value="add" class="mb-2" :disabled="!permissions.update || disabled">
        Add to Campaigns
      </RadioInput>

      <ColumnFieldMappingForm
        v-if="form.create_campaign_members && secondaryColumns && campaignRadio === 'add'"
        v-model="form.create_campaign_members"
        operator-type="import_related_item"
        :permissions="permissions"
        :fields-title="fieldsTitle"
        :columns="secondaryColumns"
        :disabled="disabled"
      />
    </div>

    <div class="mb-8">
      <div class="mb-4 text-sm font-semibold text-stone-700">
        Tasks
      </div>
      <RadioInput class="mb-2">
        Do not create Tasks
      </RadioInput>
      <RadioInput :model-value="false" disabled>
        Create Tasks
      </RadioInput>
    </div>

    <div v-if="form.valid_senders" class="mb-8">
      <div class="mb-4 text-sm font-semibold text-stone-700">
        Valid Senders
      </div>
      <div class="flex items-center gap-4">
        <div class="whitespace-nowrap text-sm">
          Email address
        </div>
        <InputGroup
          v-model="form.valid_senders.operator"
          :disabled="!permissions.update || disabled"
          type="select"
          :options="emailOperators"
          :title="fieldsTitle"
        />
        <Multiselect
          v-model="form.valid_senders.values"
          class="w-full"
          :options="[]"
          taggable
          :disabled="!permissions.update || disabled"
          :title="fieldsTitle"
          multiple
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '~/components/UI/InputGroup.vue'
import RadioInput from '~/components/UI/RadioInput.vue'
import ColumnFieldMappingForm from '~/components/Recipes/ColumnFieldMappingForm.vue'
import Multiselect from '~/components/UI/Multiselect.vue'
import partialFormMixin from '~/mixins/partial-form-mixin'

export default {
  components: { Multiselect, ColumnFieldMappingForm, RadioInput, InputGroup },

  mixins: [partialFormMixin],

  props: {
    columns: { type: Array, required: true },
    secondaryColumns: { type: Array, required: true },
    permissions: { type: Object, required: true },
    fieldsTitle: { type: String, required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    campaignRadio: 'not_add',
  }),

  computed: {
    emailOperators () {
      // Static list of common string operators for email validation
      return {
        contains: 'contains',
        equals: 'equals',
        starts_with: 'starts with',
        ends_with: 'ends with',
        not_contains: 'does not contain',
        not_equals: 'does not equal',
      }
    },
  },

  watch: {
    campaignRadio (val) {
      if (val === 'not_add') {
        this.form.configuration.create_campaign_members = []
      }
    },

    'form.column_field_mapping': function (val) {
      this.campaignRadio = val.length ? 'add' : 'not_add'
    },
  },
}
</script>
