<template>
  <div class="pointer-events-none fixed bottom-0 left-0 z-30 flex w-full justify-center lg:pl-64">
    <Transition name="pop" appear>
      <div v-if="checked.length" class="pointer-events-auto mb-4 flex w-80 max-w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-2 text-white">
        <div class="text-xs text-gray-300">
          {{ checked.length }} selected
        </div>
        <div class="flex items-center">
          <button class="rounded p-2 hover:bg-gray-700" :disabled="deleting" @click="$emit('delete')">
            <SpinnerSm v-if="deleting" size="18px" />
            <TrashIcon v-else class="size-6" />
          </button>
          <Dropdown v-if="$slots.dropdown" v-model="showDropdown">
            <template #button>
              <button class="rounded p-2 hover:bg-gray-700" :disabled="deleting" @click="showDropdown = !showDropdown">
                <DotsVerticalIcon class="size-6" />
              </button>
            </template>
            <slot name="dropdown" />
          </Dropdown>
          <button class="rounded p-2 hover:bg-gray-700" :disabled="deleting" @click="$emit('clear')">
            <XIcon class="size-6" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import TrashIcon from '@/components/Icons/TrashIcon'
import SpinnerSm from '@/components/UI/SpinnerSm'
import Dropdown from '@/components/UI/Dropdown'
import DotsVerticalIcon from '@/components/Icons/DotsVerticalIcon'
import XIcon from '@/components/Icons/XIcon'

export default {
  components: { XIcon, DotsVerticalIcon, Dropdown, SpinnerSm, TrashIcon },

  props: {
    checked: { type: Array, required: true },
    deleting: Boolean,
  },

  emits: ['clear', 'delete'],

  data: () => ({
    showDropdown: false,
  }),
}
</script>

<style lang="scss" scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.1s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.1s linear;
  transform-origin: center;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
