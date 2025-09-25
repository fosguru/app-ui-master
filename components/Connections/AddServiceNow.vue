<template>
  <ConnectionsPanel name="ServiceNow" description="salesforce.com">
    <template #img>
      <img src="~assets/images/connections/servicenow.jpg" width="63" height="56" alt="" class="mx-auto mb-10">
    </template>
  </ConnectionsPanel>
</template>

<script>
import ConnectionsPanel from '~/components/Connections/ConnectionsPanel.vue'

export default {
  components: { ConnectionsPanel },
}
</script>
