<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Modals
      </div>
      <div class="flex flex-col items-start gap-4">
        <Btn @click="modal1 = true">
          Default modal
        </Btn>
      </div>
    </div>

    <div>
      <div class="pb-4 font-bold">
        Global dialog
      </div>
      <div class="flex flex-col items-start gap-4">
        <Btn @click="$dialog.show({ header: 'Header', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })">
          Show dialog
        </Btn>
        <Btn @click="$dialog.show({ header: 'Header', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', cancelText: 'Custom cancel', okText: 'Custom ok' })">
          Show dialog custom buttons
        </Btn>
        <Btn @click="$dialog.show({ header: 'Header', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', showCancelButton: false })">
          No cancel button
        </Btn>
        <Btn @click="confirm">
          Confirm
        </Btn>
      </div>
    </div>

    <Modal v-model="modal1" content-class="max-w-lg">
      <div class="p-6">
        Some content
      </div>
    </Modal>
  </div>
</template>

<script>
import Btn from '~/components/UI/Btn.vue'
import Modal from '~/components/UI/Modal.vue'

export default {
  components: { Modal, Btn },

  data: () => ({
    modal1: false,
    modal2: false,
    modal3: false,
  }),

  methods: {
    async confirm () {
      const res = await this.$dialog.show({ header: 'Confirm?', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
      alert(res)
    },
  },
}
</script>
