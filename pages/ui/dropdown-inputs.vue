<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Date inputs
      </div>
      <div class="mb-4 flex flex-wrap items-start gap-4">
        <InputGroup label="Date type" type="date" />
        <DateInputGroup label="Date input group" />
        <DateInputGroup label="Date input group disabled" disabled />
        <DateInputGroup label="Date input group ViewOnly" view-only />
        <DateInputGroup label="Date input group" error="Error message" />
        <DateInputGroup label="Date input group loading" loading />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Date range inputs
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <DropdownDateRange v-model="dateRange" placeholder="Placeholder" label="Date range selector" />
        <DropdownDateRange v-model="dateRange" placeholder="Placeholder" label="Date range selector disabled" disabled />
        <DropdownDateRange v-model="dateRange" placeholder="Placeholder" label="Date range selector ViewOnly" view-only />
        <DropdownDateRange v-model="dateRange" placeholder="Placeholder" label="Date range selector" error="Error message" />
        <DropdownDateRange v-model="dateRange" placeholder="Placeholder" label="Date range selector loading" loading />
      </div>
    </div>

    <div>
      <div class="py-6 font-bold">
        Dropdown price range
      </div>
      <DropdownPriceRange placeholder="Placeholder" class="mb-4" :model-value="{ from: 0, to: 100 }" />
      <div class="flex flex-wrap items-start gap-4">
        <DropdownPriceRange label="Loading" placeholder="" :model-value="{ from: 0, to: 100 }" loading />
        <DropdownPriceRange label="Disabled" placeholder="" :model-value="{ from: 0, to: 100 }" disabled />
        <DropdownPriceRange label="ViewOnly" placeholder="" :model-value="{ from: 0, to: 100 }" view-only />
        <DropdownPriceRange label="Error" placeholder="" :model-value="{ from: 0, to: 100 }" error="Some error" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import InputGroup from '~/components/UI/InputGroup'
import DateInputGroup from '~/components/UI/DateInputGroup.vue'
import DropdownDateRange from '~/components/UI/DropdownDateRange.vue'
import DropdownPriceRange from '~/components/UI/DropdownPriceRange.vue'

export default {
  components: { DropdownPriceRange, DropdownDateRange, DateInputGroup, InputGroup },

  data: () => ({
    dateRange: { start: dayjs().subtract(1, 'month').toDate(), end: dayjs().toDate() },
  }),
}
</script>
