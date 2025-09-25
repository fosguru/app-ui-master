<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Breadcrumbs
      </div>

      <Breadcrumbs :crumbs="crumbs" />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/UI/Breadcrumbs.vue'

export default {
  components: { Breadcrumbs },

  data: () => ({
    crumbs: [
      { label: 'Dashboard', to: '/' },
      { label: 'Pending Actions' },
    ],
  }),
}
</script>
