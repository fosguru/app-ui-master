<template>
  <div />
</template>

<script>
import loadScript from '~/utils/load-script'

export default {
  async mounted () {
    // A wordaround to close Microsoft login popup
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    if (location.hash.includes('id_token')) {
      await loadScript('https://alcdn.msauth.net/lib/1.4.5/js/msal.min.js')

      // eslint-disable-next-line no-new
      new window.Msal.UserAgentApplication({
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
    }
  },
}
</script>
