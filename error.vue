<template>
  <NuxtLayout>
    <div class="flex min-h-screen w-screen flex-col items-center justify-center p-4 dark:text-white">
      <h1 class="text-6xl font-bold text-red-600">
        {{ error.statusCode }}
      </h1>
      <template v-if="error.statusCode === 404">
        <p class="text-xl">
          Page not found.
        </p>
      </template>
      <template v-else>
        <p>
          {{ error.message }}
        </p>
        <p>It looks like something broke.</p>
        <p>Sorry about that.</p>
      </template>
      <Btn to="/" class="relative z-10 mt-4">
        Go back home
      </Btn>
      <img src="~/assets/images/404.svg" class="-mt-16">
    </div>
  </NuxtLayout>
</template>

<script>
import { mapState } from 'pinia'
import { useError } from '#app'
import setAppearance from '~/utils/set-appearance'
import { useAuthStore } from '~/stores/auth'
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn },

  setup () {
    return { error: useError() }
  },

  computed: {
    ...mapState(useAuthStore, ['user']),
  },

  beforeMount () {
    setAppearance(this.user?.appearance)
  },
}
</script>
