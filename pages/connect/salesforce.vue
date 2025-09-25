<template>
  <div class="mx-auto flex h-screen max-w-4xl items-center justify-center p-10">
    <div v-if="creating">
      <SpinnerIcon class="size-10" />
    </div>
    <Alert v-else>
      Successfully connected
    </Alert>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { navigateTo } from 'nuxt/app'
import { useConnectionsStore } from '~/stores/connections'
import Alert from '~/components/UI/Alert.vue'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'

export default {
  components: { SpinnerIcon, Alert },

  computed: {
    ...mapState(useConnectionsStore, ['creating']),
  },

  async mounted () {
    await useConnectionsStore().createConnection({
      code: this.$route.query.code, connection_type: 'salesforce', state: this.$route.query.state,
    })

    return navigateTo('/connections', { redirectCode: 302 })
  },
}
</script>
