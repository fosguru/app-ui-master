<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Alert Banners
      </div>

      <Alert v-model="alert1" class="mb-8 bg-green-500">
        You have used 2,349 of 500,000 (0.5%) free recommendations this month.
      </Alert>

      <Alert v-model="alert2" class="bg-orange-400">
        You have used 2,349 of 5,000 (47%) free recommendations this month.
      </Alert>
    </div>
  </div>
</template>

<script>
import Alert from '~/components/UI/Alert.vue'

export default {
  components: { Alert },

  data: () => ({
    alert1: true,
    alert2: true,
  }),
}
</script>
