<template>
  <span v-tooltip="statusTooltip" class="inline-flex items-center gap-2">
    <PhCircleNotch v-if="status === 'pending_activation'" class="size-4 text-gray-400" weight="bold" />
    <PhCircleNotch v-if="status === 'initial_sync'" class="size-4 animate-spin text-red-500" weight="bold" />
    <PhPlug v-if="status === 'active'" class="shimmer size-4 text-red-500" weight="bold" />
    <PhWarning v-if="status === 'failing'" class="size-4 text-red-500" weight="bold" />
    {{ $f.capitalize(status.replace('_', ' ')) }}
  </span>
</template>

<script>
import { PhCircleNotch, PhPlug, PhWarning } from '@phosphor-icons/vue'

export default {
  components: { PhWarning, PhPlug, PhCircleNotch },

  props: {
    status: { type: String, required: true },
  },

  computed: {
    statusTooltip () {
      switch (this.status) {
        case 'pending_activation': return 'We will begin the connection process shortly! No action is needed on your side at this time. Just sit back, relax, and get ready for all of that awesome data.'
        case 'initial_sync': return 'We\'re connecting with your data. This may take a while, so you might want to check back later.'
        case 'active': return 'Your connection is active! We will continue to synchronize your data. Note that updates from your connection may take 5-10 minutes to reach Datachef.'
        case 'failing': return 'Hm, something is wrong. No fear, someone from our team is already looking into this and will reach out to your team.'
        default: return false
      }
    },
  },
}
</script>
