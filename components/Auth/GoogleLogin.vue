<template>
  <Btn color="white" class="w-full" :loading="loading" @click="logInWithGoogle">
    <img src="~/assets/images/google.svg" width="32" height="32">
    <span class="dark:text-white">Sign in with Google</span>
  </Btn>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import Btn from '~/components/UI/Btn.vue'
import loadScript from '~/utils/load-script'
import useToast from '~/composables/useToast'

export default {
  components: { Btn },

  data: () => ({
    loading: false,
  }),

  methods: {
    ...mapActions(useAuthStore, ['loginGoogle']),

    async logInWithGoogle () {
      this.loading = true
      await loadScript('https://accounts.google.com/gsi/client')

      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: this.$config.public.googleClientId,
        ux_mode: 'popup',
        scope: 'openid email profile',
        callback: this.handleCredentialResponse,
      })

      client.requestCode()
    },

    async handleCredentialResponse (data) {
      try {
        await this.loginGoogle(data)
      } catch (e) {
        useToast().addToast({ title: 'Error', text: e?.response?._data?.non_field_errors?.[0] || e.message, type: 'error' })
      }
      this.loading = false
      this.$router.replace('/')
    },
  },
}
</script>
