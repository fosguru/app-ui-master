import { defineNuxtPlugin, reactive, useRequestHeaders } from '#imports'

export default defineNuxtPlugin(async () => {
  const screen = reactive({
    name: '2xl',
    no: 4,
  })

  function updateScreen (width) {
    if (width >= 1536) {
      screen.name = '2xl'
      screen.no = 4
    } else if (width >= 1280) {
      screen.name = 'xl'
      screen.no = 3
    } else if (width >= 1024) {
      screen.name = 'lg'
      screen.no = 2
    } else if (width >= 768) {
      screen.name = 'md'
      screen.no = 1
    } else {
      screen.name = 'sm'
      screen.no = 0
    }
  }

  if (process.server) {
    // Guess screen size on backend for a proper SSR layout generation
    const MobileDetect = (await import('mobile-detect')).default
    const md = new MobileDetect(useRequestHeaders()['user-agent'])
    updateScreen(md.mobile() ? 390 : md.tablet() ? 820 : 1280)
  }

  if (process.client) {
    updateScreen(window.document.documentElement.clientWidth)
    window.addEventListener('resize', () => {
      updateScreen(window.document.documentElement.clientWidth)
    })
  }

  return {
    provide: {
      screen,
    },
  }
})
