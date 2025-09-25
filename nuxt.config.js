// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  imports: {
    autoImport: false,
  },

  gtm: {
    id: 'GTM-WCN63GHP',
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    nonce: '2726c7f26c', // Will add `nonce` to the script tag
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: false, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    devtools: false, // (optional)
  },

  components: false,

  modules: [
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      appName: 'Datachef',
      releaseStage: process.env.NUXT_PUBLIC_RELEASE_STAGE,
      apiBaseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
      microsoft: {
        clientId: process.env.NUXT_PUBLIC_MICROSOFT_CLIENT_ID,
        redirectUrl: process.env.NUXT_PUBLIC_MICROSOFT_REDIRECT_URL,
      },
      salesforce: {
        oauth2ClientId: process.env.NUXT_PUBLIC_SALESFORCE_OAUTH2_CLIENT_ID,
        oauth2RedirectUrl: process.env.NUXT_PUBLIC_SALESFORCE_OAUTH2_REDIRECT_URI,
        // oauth2SandboxRedirectUrl: process.env.NUXT_PUBLIC_SALESFORCE_OAUTH2_SANDBOX_REDIRECT_URI,
        oauth2Url: process.env.NUXT_PUBLIC_SALESFORCE_OAUTH2_URL,
        // oauth2SandboxUrl: process.env.NUXT_PUBLIC_SALESFORCE_OAUTH2_SANDBOX_URL,
      },
      contentful: {
        space: process.env.NUXT_PUBLIC_CONTENTFUL_SPACE,
        accessToken: process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      },
    },
  },
})
