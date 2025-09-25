<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Base Select
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <InputGroup placeholder="Placeholder" label="Select" type="select" :options="['One', 'Two longer option']" />
        <InputGroup placeholder="Placeholder" label="Optional" type="select" optional :options="['One', 'Two longer option']" />
        <InputGroup placeholder="Placeholder" label="Disabled" type="select" disabled :options="['One', 'Two longer option']" />
        <InputGroup placeholder="Placeholder" label="ViewOnly" type="select" view-only :options="['One', 'Two longer option']" />
        <InputGroup placeholder="Placeholder" label="Loading" type="select" loading :options="['One', 'Two longer option']" />
        <InputGroup placeholder="Placeholder" label="Loading" type="select" loading :options="['One', 'Two longer option']">
          <template #append>
            units
          </template>
        </InputGroup>
        <InputGroup placeholder="Placeholder" label="Error" type="select" error="Error message" :options="['One', 'Two longer option']" />
        <InputGroup
          placeholder="Placeholder"
          label="Error no icon"
          type="select"
          error="Error message"
          no-error-icon
          :options="['One', 'Two longer option']"
        />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Dropwown select
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <DropdownSelect v-model="select" placeholder="Placeholder" label="Multiple" :options="{ 1: 'One', 2: 'Two longer option' }" />
        <DropdownSelect v-model="select2" placeholder="Placeholder" label="Multiple" :options="{ 1: 'One', 2: 'Two longer option' }" />
        <DropdownSelect v-model="select2" disabled placeholder="Placeholder" label="Disabled" :options="{ 1: 'One', 2: 'Two longer option' }" />
        <DropdownSelect v-model="select2" view-only placeholder="Placeholder" label="ViewOnly" :options="{ 1: 'One', 2: 'Two longer option' }" />
        <DropdownSelect v-model="select2" placeholder="Placeholder" label="Multiple" :options="{ 1: 'One', 2: 'Two longer option' }" loading />
        <DropdownSelect
          v-model="select3"
          placeholder="Placeholder"
          single
          label="Single"
          :options="{ 1: 'One', 2: 'Two longer option' }"
        />
        <DropdownSelect
          v-model="select4"
          hide-search
          placeholder="Placeholder"
          label="No search"
          :options="{ 1: 'One', 2: 'Two longer option' }"
        />
        <DropdownSelect
          v-model="select"
          placeholder="Placeholder"
          error="Error message"
          label="Multiple"
          :options="{ 1: 'One', 2: 'Two longer option' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '~/components/UI/InputGroup'
import DropdownSelect from '~/components/UI/DropdownSelect.vue'

export default {
  components: { DropdownSelect, InputGroup },

  data: () => ({
    select: [],
    select2: ['1', '2'],
    select3: null,
    select4: [],
    color: null,
    tags: [],
  }),
}
</script>
