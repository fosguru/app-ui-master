<template>
  <Modal :model-value="!!modelValue" content-class="max-w-xl" @update:model-value="$emit('update:modelValue', null)">
    <div class="p-6 text-left">
      <h3 class="text-lg font-medium">
        Edit connection
      </h3>
    </div>
    <div class="relative flex flex-col gap-4 px-6 pb-6">
      <InputGroup v-model="form.name" label="Name" :error="errors.name?.[0]" />
    </div>
    <div class="flex flex-col items-center p-6">
      <div class="flex w-full justify-between space-x-4">
        <Btn color="white" class="w-full justify-center" :disabled="updating" @click="close">
          Cancel
        </Btn>
        <Btn :loading="updating" :disabled="updating" class="w-full justify-center" @click="submit">
          Update
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'pinia'
import pick from 'lodash/pick'
import Modal from '@/components/UI/Modal'
import Btn from '@/components/UI/Btn'
import InputGroup from '~/components/UI/InputGroup.vue'
import { useConnectionsStore } from '~/stores/connections'

export default {
  components: { InputGroup, Btn, Modal },

  props: {
    modelValue: { type: Object, default: null },
  },

  emits: ['update:modelValue', 'updated'],

  data: () => ({
    form: {
      name: '',
    },

    errors: {},
  }),

  computed: {
    ...mapState(useConnectionsStore, ['updating']),
  },

  watch: {
    modelValue () {
      this.form = pick(this.modelValue, ['name'])
    },
  },

  methods: {
    async submit () {
      this.errors = {}
      try {
        await useConnectionsStore().updateConnection(this.modelValue.uuid, this.form)
        this.close()
        this.$emit('updated')
      } catch (e) {
        if (e?.response?.status === 400) {
          this.errors = e.response._data
        }
      }
    },

    close () {
      this.$emit('update:modelValue', null)
    },
  },
}
</script>
