<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Checkboxes
      </div>
      <div class="flex flex-col items-start gap-4">
        <Checkbox v-model="checkbox1">
          Checkbox interactive
        </Checkbox>
        <Checkbox :model-value="true">
          Checkbox checked
        </Checkbox>

        <Checkbox size="lg">
          Checkbox lg
        </Checkbox>
        <Checkbox size="lg" :model-value="true">
          Checkbox lg checked
        </Checkbox>

        <Checkbox disabled>
          Disabled
        </Checkbox>
        <Checkbox :model-value="true" disabled>
          Disabled checked
        </Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '~/components/UI/Checkbox'

export default {
  components: { Checkbox },

  data: () => ({
    checkbox1: false,
  }),
}
</script>
