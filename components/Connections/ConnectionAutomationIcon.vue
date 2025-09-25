<template>
  <span v-tooltip="!noTooltip && tooltipText" class="flex items-center gap-2">
    <PhLightning v-if="automation === 'automatic'" class="shimmer size-5 text-red-500" weight="fill" />
    <PhQueue v-if="automation === 'queue'" class="shimmer size-5 text-red-500" weight="fill" />
    <PhStop v-if="automation === 'deactivated'" weight="fill" class="size-5 text-gray-400" />
    <span class="capitalize">{{ automation }}</span>
  </span>
</template>

<script>
import { PhLightning, PhQueue, PhStop } from '@phosphor-icons/vue'

export default {
  components: { PhStop, PhQueue, PhLightning },

  props: {
    automation: { type: String, required: true },
    noTooltip: Boolean,
  },

  computed: {
    tooltipText () {
      switch (this.automation) {
        case 'automatic': return 'This recipe is in Automatic mode, which means actions will be automatically applied.'
        case 'queue': return 'This recipe is in Queue mode. No actions are taken unless someone on your team approves them. Actions will show up regularly, so check back soon.'
        default: return null
      }
    },
  },
}
</script>
