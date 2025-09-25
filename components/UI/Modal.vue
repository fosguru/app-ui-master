<template>
  <Teleport to="body">
    <Transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="full-modal fixed inset-0 z-40 flex items-center overflow-y-auto bg-black bg-opacity-50 p-2 dark:bg-white/10 md:p-4"
        @mousedown="$emit('update:modelValue', false)"
      >
        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="scale-95"
          enter-to-class="scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="scale-100"
          leave-to-class="scale-95"
          appear
        >
          <div v-if="showContent" class="modal-content max-w-160 relative m-auto w-full rounded-xl bg-white shadow-lg dark:bg-stone-800 dark:text-stone-200" :class="contentClass" @mousedown.stop>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
// import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

export default {
  props: {
    modelValue: { type: Boolean, required: true },
    contentClass: { type: String, default: 'md:w-160' },
  },

  emits: ['update:modelValue'],

  data: () => ({
    showModal: false,
    showContent: false,
  }),

  watch: {
    modelValue (val) {
      this.checkValue(val)
    },
  },

  mounted () {
    this.checkValue(this.modelValue)
  },

  beforeUnmount () {
    // clearAllBodyScrollLocks()
  },

  methods: {
    checkValue (val) {
      if (val) {
        this.showModal = true
        this.$nextTick(() => {
          this.showContent = true
          this.$nextTick(() => {
            // disableBodyScroll(this.$refs.container)
          })
        })
      } else {
        // clearAllBodyScrollLocks()
        this.showContent = false
        this.$nextTick(() => {
          this.showModal = false
        })
      }
    },
  },
}
</script>
