<template>
  <Btn color="white" size="sm" @click="showModal = true">
    Edit priority list
  </Btn>
  <Modal :model-value="showModal" content-class="max-w-md" @update:model-value="showModal = false">
    <div class="relative flex flex-col gap-4 p-6">
      <Draggable v-model="form" tag="transition-group" :animation="200" handle=".handle">
        <template #item="{ index }">
          <div class="flex items-center gap-2">
            <PhList v-if="!disabled" class="handle size-6 cursor-grab" />
            <InputGroup v-model="form[index]" class="w-full" :disabled="disabled" />
            <button v-if="!disabled" class="shrink-0 rounded-full bg-gray-200 p-1 dark:bg-stone-500 dark:text-stone-100" @click="form.splice(index, 1)">
              <PhMinus class="size-3" weight="bold" />
            </button>
          </div>
        </template>
      </Draggable>

      <button v-if="!disabled" class="mr-auto text-sm font-semibold text-rose-500" @click="form.push('')">
        + Add line
      </button>

      <div class="flex justify-evenly gap-4">
        <Btn color="white" class="w-full" @click="showModal = false">
          Cancel
        </Btn>
        <Btn v-if="!disabled" class="w-full" @click="save">
          Save
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import { PhList, PhMinus } from '@phosphor-icons/vue'
import Draggable from 'vuedraggable'
import Modal from '@/components/UI/Modal'
import Btn from '@/components/UI/Btn'
import InputGroup from '~/components/UI/InputGroup.vue'

export default {
  components: { PhList, PhMinus, InputGroup, Btn, Modal, Draggable },

  props: {
    modelValue: { type: Array, required: true },
    disabled: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    showModal: false,
    form: [],
  }),

  watch: {
    showModal (val) {
      if (val) {
        this.form = [...this.modelValue]
      }
    },
  },

  methods: {
    save () {
      this.$emit('update:modelValue', [...this.form])
      this.showModal = false
    },
  },
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
