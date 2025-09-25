<template>
  <div class="flex flex-col gap-2">
    <MenuItem to="/">
      <PhGauge class="size-4" weight="bold" />
      Dashboard
    </MenuItem>
    <MenuItem to="/actions">
      <PhQueue class="size-4" weight="bold" />
      Actions
    </MenuItem>
    <MenuItem to="/connections">
      <PhPlug class="size-4" weight="bold" />
      Connections
    </MenuItem>
    <MenuItem v-if="joinedDaysAgo < 15" to="/start">
      <PhRocketLaunch class="size-4" weight="bold" />
      Getting Started
    </MenuItem>
    <MenuItem to="/help">
      <PhQuestion class="size-4" weight="bold" />
      Help
    </MenuItem>
    <MenuItem to="/settings">
      <PhDotsThreeOutlineVertical class="size-4" weight="bold" />
      Settings
    </MenuItem>
  </div>
</template>

<script>
import { PhDotsThreeOutlineVertical, PhGauge, PhPlug, PhQuestion, PhQueue, PhRocketLaunch } from '@phosphor-icons/vue'
import { mapState } from 'pinia'
import dayjs from 'dayjs'
import MenuItem from '~/components/UI/MenuItem.vue'
import { useAuthStore } from '~/stores/auth'

export default {
  components: { PhGauge, PhDotsThreeOutlineVertical, PhPlug, PhQuestion, PhQueue, PhRocketLaunch, MenuItem },

  computed: {
    ...mapState(useAuthStore, ['user']),

    joinedDaysAgo () {
      return dayjs().diff(this.user.date_joined, 'day')
    },
  },
}
</script>
