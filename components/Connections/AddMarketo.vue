<template>
  <ConnectionsPanel name="Marketo" description="Adobe" @click="showModal = true">
    <template #img>
      <img src="~assets/images/connections/marketo.jpg" width="98" height="70" alt="" class="mx-auto">
    </template>
    <AddMarketoModal v-model="showModal" />
  </ConnectionsPanel>
</template>

<script>
import ConnectionsPanel from '~/components/Connections/ConnectionsPanel.vue'
import AddMarketoModal from '~/components/Connections/AddMarketoModal.vue'

export default {
  components: { AddMarketoModal, ConnectionsPanel },

  data: () => ({
    showModal: false,
  }),
}
</script>
