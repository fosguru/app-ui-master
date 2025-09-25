<template>
  <div />
</template>

<script>
import { navigateTo } from '#imports'
import { useAuthStore } from '~/stores/auth'

export default {
  setup () {
    useAuthStore().logout()
    navigateTo('/login', { redirectCode: 302 })
  },
}
</script>
