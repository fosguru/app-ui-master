import { nextTick, watch } from 'vue'
import { defineNuxtPlugin } from '#imports'
import { useAuthStore } from '~/stores/auth'
import { useRoute } from '#app'
import loadScript from '~/utils/load-script'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client side
  if (process.client) {
    const route = useRoute()

    // Don't load ChatWoot on login page
    if (route.path === '/login') {
      return
    }
    try {
      const authStore = useAuthStore(nuxtApp.$pinia)

      // Function to check if ChatWoot should be visible
      const shouldShowChatWoot = () => {
        return route.path !== '/login' && authStore.token && authStore.user
      }

      // Function to initialize ChatWoot
      const initializeChatWoot = async () => {
        if (! shouldShowChatWoot()) {
          return
        }

        // Load ChatWoot SDK if not already loaded
        if (! window.chatwootSDK) {
          await loadScript('https://app.chatwoot.com/packs/js/sdk.js')
        }

        // Initialize ChatWoot widget
        if (window.chatwootSDK) {
          // Function to get current user data for ChatWoot
          const getChatWootUserData = () => {
            const user = authStore.user
            if (user && user.email) {
              const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim()
              return {
                identifier: user.email,
                name: userName || user.email,
                email: user.email,
              }
            }
            return null
          }

          // Initialize with user data if available
          const chatWootConfig = {
            websiteToken: 'FUgMdUA3TMY2Vyhak3KZCARq',
            baseUrl: 'https://app.chatwoot.com',
          }

          // Add user data to config if available
          const userData = getChatWootUserData()
          if (userData) {
            chatWootConfig.user = userData
          }

          window.chatwootSDK.run(chatWootConfig)

          // Function to set user information in ChatWoot using multiple approaches
          const setChatWootUser = (user) => {
            if (user && user.email && window.chatwootSDK) {
              const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim()

              // Standard user data format
              const userData = {
                identifier: user.email,
                name: userName || user.email,
                email: user.email,
              }

              // Alternative user data format (some ChatWoot versions use different fields)
              const altUserData = {
                identifier_hash: '',
                name: userName || user.email,
                email: user.email,
                avatar_url: '',
              }

              const setUserWithMultipleAttempts = (retryCount = 0) => {
                const maxRetries = 3

                const attemptSetUser = () => {
                  try {
                    // Try multiple method names that different ChatWoot versions might use
                    if (typeof window.chatwootSDK.setUser === 'function') {
                      window.chatwootSDK.setUser(userData)
                      return true
                    }

                    if (typeof window.chatwootSDK.setContact === 'function') {
                      window.chatwootSDK.setContact(userData)
                      return true
                    }

                    if (typeof window.chatwootSDK.identify === 'function') {
                      window.chatwootSDK.identify(userData)
                      return true
                    }

                    // Try with alternative data format
                    if (typeof window.chatwootSDK.setUser === 'function') {
                      window.chatwootSDK.setUser(altUserData)
                      return true
                    }

                    return false
                  } catch (error) {
                    return false
                  }
                }

                if (! attemptSetUser() && retryCount < maxRetries) {
                  // Exponential backoff: 1s, 2s, 4s
                  const delay = 2 ** retryCount * 1000
                  setTimeout(() => setUserWithMultipleAttempts(retryCount + 1), delay)
                }
              }

              setUserWithMultipleAttempts()
            }
          }

          // Function to wait for ChatWoot to be ready using event-based approach
          const waitForChatWootReady = (callback, maxWait = 10000) => {
            const startTime = Date.now()

            const checkReady = () => {
              if (window.chatwootSDK && typeof window.chatwootSDK.setUser === 'function') {
                callback()
              } else if (Date.now() - startTime < maxWait) {
                setTimeout(checkReady, 500)
              }
            }

            checkReady()
          }

          // Wait for ChatWoot to be fully ready before attempting user identification
          waitForChatWootReady(() => {
            setChatWootUser(authStore.user)
          })

          // Watch for user changes (login/logout/user data loading)
          watch(() => authStore.user, (newUser) => {
            if (newUser && shouldShowChatWoot()) {
              nextTick(() => {
                // Small delay to ensure any auth-related DOM updates are complete
                setTimeout(() => setChatWootUser(newUser), 300)
              })
            }
          })
        }
      }

      // Initialize ChatWoot if conditions are met
      await initializeChatWoot()

      // Watch for authentication changes and route changes
      watch(() => [authStore.token, authStore.user, route.path], async () => {
        // Hide ChatWoot on login page or when not authenticated
        if (route.path === '/login' || ! authStore.token || ! authStore.user) {
          // Hide the ChatWoot widget if it exists
          if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
            try {
              window.chatwootSDK.toggle('close')
            } catch (error) {
              // Silently handle errors
            }
          }
          return
        }

        // Show/initialize ChatWoot when navigating to authenticated pages
        if (shouldShowChatWoot()) {
          await initializeChatWoot()
        }
      })
    } catch (error) {
      // Silently handle errors in production
    }
  }
})
