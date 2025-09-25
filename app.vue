<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import 'v-calendar/style.css'
import { mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import setAppearance from '~/utils/set-appearance'

export default {
  computed: {
    ...mapState(useAuthStore, ['user']),
  },

  watch: {
    'user.appearance': function () {
      setAppearance(this.user?.appearance)
    },
  },

  beforeMount () {
    setAppearance(this.user?.appearance)
  },
}
</script>
