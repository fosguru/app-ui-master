<template>
  <ConnectionsPanel name="Salesforce" description="salesforce.com" @click="onClick">
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
      })
      const url = `${conf.oauth2Url}?${params}`

      window.location = url
    },
  },
}
</script>
