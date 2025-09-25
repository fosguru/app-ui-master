<template>
  <div v-show="showAll" class="fixed inset-0 z-30 overflow-hidden" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <!-- Background overlay, show/hide based on slide-over state. -->
      <Transition
        appear
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showPanel" class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" aria-hidden="true" @click="$emit('update:modelValue', false)" />
      </Transition>
      <div
        class="fixed inset-y-0 flex max-w-full"
        :class="right ? 'right-0' : 'left-0'"
      >
        <Transition
          appear
          :enter-from-class="right ? 'translate-x-full' : '-translate-x-full'"
          enter-to-class="translate-x-0"
          leave-class="translate-x-0"
          :leave-to-class="right ? 'translate-x-full' : '-translate-x-full'"
          @after-leave="showAll = false"
        >
          <div v-if="showPanel" :class="panelClass" class="max-w-full transition duration-500 ease-in-out">
            <slot />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, required: true },
    panelClass: { type: String, default: 'w-64' },
    right: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    showAll: false,
    showPanel: false,
  }),

  watch: {
    modelValue (val) {
      this.updateValue(val)
    },
  },

  mounted () {
    this.updateValue(this.modelValue)
  },

  methods: {
    updateValue (val) {
      if (val) {
        this.$nextTick(() => {
          this.showAll = true
          this.$nextTick(() => {
            this.showPanel = true
          })
        })
      } else {
        this.showPanel = false
      }
    },
  },
}
</script>
