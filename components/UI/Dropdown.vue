<template>
  <div class="relative text-left">
    <div ref="button" class="w-full">
      <slot name="button" :toggle="toggle" :opened="opened" />
    </div>

    <CollapseTransition v-if="inline">
      <div
        v-if="modelValue"
        ref="content"
        class="pt-3"
        :class="[classProp]"
        :style="styleProp"
      >
        <div class="bg-white">
          <slot />
        </div>
      </div>
    </CollapseTransition>
    <ClientOnly v-else>
      <Teleport to="body">
        <Transition
          appear
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="opened"
            ref="content"
            class="absolute z-50"
            :class="[classProp, originClass]"
            :style="{ ...styleProp, ...style, maxWidth: 'calc(100vw - 10px)' }"
          >
            <div class="overflow-x-auto rounded-md border bg-white shadow-lg dark:border-stone-600 dark:bg-stone-700 dark:text-stone-200">
              <slot />
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script>
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import CollapseTransition from '~/components/UI/CollapseTransition'

export default {
  components: { CollapseTransition },

  props: {
    modelValue: Boolean,
    placement: { type: String, default: 'bottom-start' },
    inline: Boolean,
    classProp: { type: String, default: '' },
    styleProp: { type: Object, default: () => ({}) },
    hideOnClickOutside: { type: Boolean, default: true },
    fitBtnWidth: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    style: {},
    cleanup: null,
    opened: false,
    currentPlacement: 'bottom-start',
  }),

  computed: {
    originClass () {
      switch (this.currentPlacement) {
        case 'bottom-start': return 'origin-top-left'
        case 'bottom-center': return 'origin-top'
        case 'bottom-end': return 'origin-top-right'
        case 'top-start': return 'origin-bottom-left'
        case 'top-center': return 'origin-bottom'
        case 'top-end': return 'origin-bottom-right'
        case 'left-start': return 'origin-top-right'
        case 'left-center': return 'origin-right'
        case 'left-end': return 'origin-bottom-right'
        case 'right-start': return 'origin-top-left'
        case 'right-center': return 'origin-left'
        case 'right-end': return 'origin-bottom-left'
        default: return 'origin-top-right'
      }
    },
  },

  watch: {
    modelValue (val) {
      this.opened = val
    },

    opened (val) {
      if (val) {
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.initDropdown()
          })
        })
      } else {
        this.style = {}
        if (this.cleanup) { this.cleanup() }
      }
    },
  },

  beforeUnmount () {
    if (this.cleanup) { this.cleanup() }
    document.removeEventListener('click', this.documentClick)
  },

  mounted () {
    this.opened = this.modelValue
    document.addEventListener('click', this.documentClick)
  },

  methods: {
    initDropdown () {
      const btn = this.$refs.button.childNodes[1]
      const dropdown = this.$refs.content
      if (! dropdown) { return }
      if (this.fitBtnWidth) {
        dropdown.style.width = `${btn.clientWidth}px`
      }

      this.cleanup = autoUpdate(btn, dropdown, async () => {
        const { x, y, placement } = await computePosition(btn, dropdown, {
          placement: this.placement,
          middleware: [offset(12), flip(), shift({ padding: 5 })],
        })
        this.currentPlacement = placement
        this.style = {
          top: `${y}px`,
          left: `${x}px`,
        }
      })
    },

    documentClick (e) {
      if (! this.hideOnClickOutside || ! this.$refs.content || ! this.opened) { return }
      if (! this.$refs.content.contains(e.target) && ! this.$refs.button.contains(e.target)) {
        this.opened = false
        this.$emit('update:modelValue', false)
      }
    },

    toggle () {
      this.opened = ! this.opened
    },
  },
}
</script>
