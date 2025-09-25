<template>
  <Modal :model-value="modelValue" content-class="max-w-xl" @update:model-value="$emit('update:modelValue', false)">
    <div class="px-6 pb-4 pt-6 text-left">
      <h1 class="font-large text-xl">
        &#x1F44B; &nbsp;&nbsp;<b>Welcome!</b>
      </h1>
    </div>
    <hr class="py-2">
    <div class="px-6">
      <p class="pb-2">
        A few notes as you get started:
      </p>
      <p class="pb-2">
        &bull; If you're the first to sign up from your company, you will be the administrator by default. If you're not the first from your company, you will have view-only permissions by default.
      </p>
      <p class="pb-2">
        &bull; Before we provision your recipes, we need to connect to your data. To do that, head to <b><i>Connections</i></b> > <b><i>Add Connection</i></b>.
      </p>
      <p class="pb-2">
        &bull; Datachef needs time to connect and profile your data before any recipes will show up in your dashboard. After you connect, plan to check back in 1-2 hours for recipes and suggestions.
      </p>
      <p class="pb-2">
        &bull; Check out <NuxtLink to="`/start/`" class="font-bold text-red-500">
          Getting Started
        </NuxtLink> and learn everything you need to know in less than 10 minutes.
      </p>
    </div>
    <div class="flex flex-col items-center p-6">
      <div class="flex w-full justify-between space-x-4">
        <Btn color="white" class="w-full justify-center" @click="onNeverShow">
          Dismiss message
        </Btn>
        <!-- <Btn class="w-full justify-center" @click="$emit('update:modelValue', false)">
          Dismiss until next time
        </Btn> -->
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/UI/Modal'
import Btn from '@/components/UI/Btn'
import { useCookie } from '#app'

export default {
  components: { Btn, Modal },

  props: {
    modelValue: Boolean,
  },

  emits: ['update:modelValue'],

  methods: {
    onNeverShow () {
      useCookie('no-welcome-modal', { maxAge: 1e9 }).value = '1'
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
