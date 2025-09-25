<template>
  <Modal :model-value="modelValue" content-class="max-w-xl" @update:model-value="v => $emit('update:modelValue', v)">
    <div class="p-6 text-left">
      <h3 class="text-lg font-medium">
        Add Marketo
      </h3>
    </div>
    <div class="relative flex flex-col gap-4 px-6 pb-6">
      <InputGroup v-model="form.name" label="Name" :error="errors.name?.[0]" />
      <InputGroup v-model="form.connection_id" label="Munchkin ID" :error="errors.connection_id?.[0]" />
      <InputGroup v-model="form.client_id" label="Client ID" :error="errors.client_id?.[0]" />
      <InputGroup v-model="form.secret_arn" label="Client Secret" :error="errors.secret_arn?.[0]" />
    </div>
    <div class="flex flex-col items-center p-6">
      <div class="flex w-full justify-between space-x-4">
        <Btn color="white" class="w-full justify-center" :disabled="creating" @click="close">
          Cancel
        </Btn>
        <Btn :loading="creating" :disabled="creating" class="w-full justify-center" @click="submit">
          Add
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'pinia'
import Modal from '@/components/UI/Modal'
import Btn from '@/components/UI/Btn'
import InputGroup from '~/components/UI/InputGroup.vue'
import { useConnectionsStore } from '~/stores/connections'

const baseForm = {
  name: '',
  connection_type: 'marketo',
  connection_id: '',
  client_id: '',
  secret_arn: '',
}

export default {
  components: { InputGroup, Btn, Modal },

  props: {
    modelValue: { type: Boolean, required: true },
  },

  emits: ['update:modelValue'],

  data: () => ({
    form: { ...baseForm },
    errors: {},
  }),

  computed: {
    ...mapState(useConnectionsStore, ['creating']),
  },

  methods: {
    async submit () {
      this.errors = {}
      try {
        await useConnectionsStore().createConnection(this.form)
        this.close()
      } catch (e) {
        if (e?.response?.status === 400) {
          this.errors = e.response._data
        }
      }
    },

    close () {
      this.form = { ...baseForm }
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
