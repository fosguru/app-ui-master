<template>
  <div class="flex flex-1 flex-col lg:flex-row">
    <div class="flex w-full justify-center bg-white">
      <div class="flex h-full flex-col items-center justify-between px-8">
        <div class="flex h-full items-center">
          <div class="mas-w-xl mt-16">
            <Badge class="mb-4 bg-gray-100 text-gray-500">
              Beta Access
            </Badge>
            <h1 class="mb-4 text-3xl font-semibold text-stone-900">
              Register or Sign In
            </h1>
            <div class="mb-8 text-stone-500">
              Use your work email (not Gmail, icloud, etc.)
            </div>
            <MicrosoftLogin class="mb-2" />
            <GoogleLogin />
          </div>
        </div>
        <div class="my-8 text-sm text-stone-400">
          © {{ currentYear() }} Datachef Technologies, Inc.
        </div>
      </div>
    </div>
    <div class="flex h-screen flex-1 flex-col justify-between bg-stone-100 xl:min-w-[30rem]">
      <img src="~/assets/images/logo.svg" alt="" width="115" height="20" class="mx-auto my-8 shrink-0">
      <div class="ml-auto flex min-h-0 flex-shrink">
        <img src="~/assets/images/datachef-login.png" alt="" width="513" height="725" class="size-full">
      </div>
      <div class="mx-16 mb-16">
        <div class="mb-2 text-xl font-semibold text-stone-900">
          Prepare for delightful data ops.
        </div>
        <div class="text-stone-700">
          Connect, allow some time for data analysis, and you're up and running.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '~/components/UI/Badge.vue'
import GoogleLogin from '~/components/Auth/GoogleLogin.vue'
import MicrosoftLogin from '~/components/Auth/MicrosoftLogin.vue'
import { useHead, useRuntimeConfig } from '#imports'

export default {
  components: { MicrosoftLogin, GoogleLogin, Badge },

  setup () {
    useHead({
      title: `Login | ${useRuntimeConfig().public.appName}`,
    })
  },

  methods: {
    currentYear () {
      const current = new Date()
      const date = `${current.getFullYear()}`
      return date
    },
  },
}
</script>
