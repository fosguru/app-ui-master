<template>
  <ClientOnly>
    <Notifications />
    <GlobalDialog />
  </ClientOnly>
  <div class="flex min-h-screen w-screen flex-col">
    <slot />
  </div>
</template>

<script>
import Notifications from '~/components/Layout/Notifications.vue'
import GlobalDialog from '~/components/Layout/GlobalDialog.vue'

export default {
  components: { GlobalDialog, Notifications },
}
</script>
