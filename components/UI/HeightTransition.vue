<template>
  <div>
    <slot name="button" :toggle="toggle" :opened="show" />
    <Transition
      name="collapse"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="show" :class="shown ? '' : 'overflow-hidden'" style="transition: 0.3s ease-out;">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    defaultOpen: Boolean,
  },

  data: () => ({
    show: false,
    shown: false,
  }),

  watch: {
    modelValue (val) {
      this.show = val
    },

    show (val) {
      // overflow-hidden only when hidden or animating
      if (val) {
        setTimeout(() => this.shown = true, 300)
      } else {
        this.shown = false
      }
    },
  },

  created () {
    this.show = this.defaultOpen
  },

  methods: {
    beforeEnter (el) {
      el.style.height = '0'
    },

    afterEnter (el) {
      el.style.height = 'auto'
    },

    enter (el) {
      el.style.height = `${el.scrollHeight}px`
    },

    beforeLeave (el) {
      el.style.height = `${el.scrollHeight}px`
    },

    leave (el) {
      el.style.height = '0'
    },

    toggle () {
      this.show = ! this.show
    },
  },
}
</script>
