<template>
  <ConnectionsPanel name="Marketing Cloud" description="salesforce.com">
    <template #img>
      <img src="~assets/images/connections/salesforce.jpg" width="79" height="56" alt="" class="mx-auto">
    </template>
  </ConnectionsPanel>
</template>

<script>
import ConnectionsPanel from '~/components/Connections/ConnectionsPanel.vue'

export default {
  components: { ConnectionsPanel },
}
</script>
