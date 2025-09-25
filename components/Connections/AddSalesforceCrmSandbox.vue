<template>
  <ConnectionsPanel name="Salesforce Sandbox" description="salesforce.com" @click="onClick">
    <template #img>
      <img src="~assets/images/connections/salesforce.png" width="79" height="56" alt="" class="mx-auto">
    </template>
  </ConnectionsPanel>
</template>

<script>
import ConnectionsPanel from '~/components/Connections/ConnectionsPanel.vue'

export default {
  components: { ConnectionsPanel },

  methods: {
    onClick () {
      const conf = this.$config.public.salesforce
      const params = new URLSearchParams({
        client_id: conf.oauth2ClientId,
        redirect_uri: conf.oauth2RedirectUrl,
        response_type: 'code',
        state: 'is_sandbox',
      })
      const url = `https://test.salesforce.com/services/oauth2/authorize?${params}`

      window.location = url
    },
  },
}
</script>
