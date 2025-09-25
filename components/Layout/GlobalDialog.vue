<template>
  <Modal v-model="value" content-class="max-w-md">
    <div class="p-6">
      <div class="mb-6">
        <div v-if="header" class="mb-2 text-lg font-medium">
          {{ header }}
        </div>
        <div v-if="message">
          {{ message }}
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <Btn v-if="showCancelButton" color="white" @click="cancel">
          {{ cancelText }}
        </Btn>
        <Btn @click="confirm">
          {{ okText }}
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import { emitter } from '~/plugins/dialog.client'
import Modal from '~/components/UI/Modal'
import Btn from '@/components/UI/Btn'

const initialData = {
  value: false,
  header: '',
  message: '',
  showCancelButton: true,
  cancelText: 'Cancel',
  okText: 'Ok',
  resolve: null,
}

export default {
  components: { Btn, Modal },

  data () {
    return Object.assign({}, initialData)
  },

  beforeMount () {
    emitter.on('show', (params, resolve) => {
      this.show(params, resolve)
    })
  },

  methods: {
    cancel () {
      this.value = false
      this.resolve(false)
    },

    confirm () {
      this.value = false
      this.resolve(true)
    },

    show (params, resolve) {
      Object.assign(this, Object.assign({}, initialData), params)
      this.resolve = resolve
      this.value = true
    },
  },
}
</script>
