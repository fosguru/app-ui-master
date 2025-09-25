<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Tabs
      </div>
      <div class="flex max-w-xl flex-col items-start gap-4">
        <Tabs v-model="tab" default="general" :tabs="tabs" />

        <div v-if="tab === 'general'">
          General Settings tab
        </div>
        <div v-if="tab === 'actions'">
          Actions tab
        </div>
        <div v-if="tab === 'meals'">
          Meals tab
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '~/components/UI/Tabs.vue'

export default {
  components: { Tabs },

  data: () => ({
    tab: 'general',
    tabs: {
      general: {
        title: 'General Settings',
        hasError: false,
      },

      actions: {
        title: 'Actions',
        hasError: false,
      },

      meals: {
        title: 'Meals',
        hasError: false,
      },
    },
  }),
}
</script>
