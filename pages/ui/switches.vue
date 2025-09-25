<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Toggles
      </div>
      <div class="flex flex-col items-start gap-4">
        <label class="inline-flex items-center gap-4"><ToggleInput v-model="toggle1" /> Toggle off interactive</label>
        <label class="inline-flex items-center gap-4"><ToggleInput :model-value="true" /> Toggle on</label>
        <label class="inline-flex items-center gap-4"><ToggleInput :model-value="false" disabled /> Toggle off disabled</label>
        <label class="inline-flex items-center gap-4"><ToggleInput :model-value="true" disabled /> Toggle on disabled</label>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleInput from '~/components/UI/ToggleInput.vue'

export default {
  components: { ToggleInput },

  data: () => ({
    switch1: false,
    toggle1: false,
    toggle2: false,
  }),
}
</script>
