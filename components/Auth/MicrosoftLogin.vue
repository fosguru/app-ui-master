<template>
  <Btn color="white" class="w-full" :loading="loading" @click="login">
    <img src="~/assets/images/microsoft.svg" width="32" height="32">
    <span class="dark:text-white">Sign in with Microsoft 365</span>
  </Btn>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import Btn from '~/components/UI/Btn.vue'
import useToast from '~/composables/useToast'
import loadScript from '~/utils/load-script'

export default {
  components: { Btn },

  data: () => ({
    loading: false,
  }),

  methods: {
    ...mapActions(useAuthStore, ['loginMicrosoft']),

    async login () {
      this.loading = true
      await loadScript('https://alcdn.msauth.net/lib/1.4.5/js/msal.min.js')

      const msal = new window.Msal.UserAgentApplication({
        auth: {
          clientId: this.$config.public.microsoft.clientId,
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: this.$config.public.microsoft.redirectUrl,
        },

        cache: {
          cacheLocation: 'sessionStorage', // This configures where your cache will be stored
          storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
      })

      try {
        const params = {
          scopes: ['openid', 'profile', 'User.Read'],
        }
        await msal.loginPopup(params)

        const login = await msal.acquireTokenSilent(params)
        await this.loginMicrosoft(login)

        this.$router.replace('/')
      } catch (e) {
        useToast().addToast({ title: 'Error', text: e.message, type: 'error' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
