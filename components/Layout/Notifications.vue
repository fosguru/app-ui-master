<template>
  <div class="pointer-events-none fixed inset-0 flex items-end justify-center p-6 px-4" style="z-index: 5000;">
    <div class="w-full max-w-lg">
      <TransitionGroup name="toasts">
        <div
          v-for="notification in toasts"
          :key="notification.id"
          class="notification pointer-events-auto mt-4 rounded-xl px-4 py-3 shadow-lg"
          :class="notification.type === 'info' ? 'bg-sky-600' : 'bg-red-500'"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <PhInfo v-if="notification.type === 'info'" weight="fill" class="size-5 text-white" aria-hidden="true" />
                <PhXCircle v-else class="text-green-40 size-5 text-white" weight="fill" />
              </div>
              <div v-if="notification.text" class="text-sm text-white">
                {{ notification.text }}
              </div>
            </div>
            <button type="button" @click="removeToast(notification.id)">
              <PhX class="size-5 text-white" weight="bold" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { PhInfo, PhX, PhXCircle } from '@phosphor-icons/vue'
import useToast from '~/composables/useToast'

export default {
  components: { PhX, PhXCircle, PhInfo },

  data: () => ({
    toasts: [],
    removeToast: null,
  }),

  mounted () {
    const { toasts, removeToast } = useToast()
    this.toasts = toasts
    this.removeToast = removeToast
  },
}
</script>

<style scoped>
.toasts-move,
.toasts-enter-active,
.toasts-leave-active {
  transition: all 0.5s ease-out;
}
.toasts-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toasts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* .toasts-leave-active {
  position: absolute;
} */
</style>
