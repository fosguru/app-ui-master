<template>
  <Panel>
    <div class="py-2">
      <div class="h-24">
        <slot name="img" />
      </div>
      <div class="mb-2 text-center text-xl font-semibold text-black dark:text-stone-200">
        {{ name }}
      </div>
      <div class="mb-4 text-center text-stone-400">
        {{ description }}
      </div>
      <div class="text-center">
        <Btn @click="$emit('click')">
          Connect
        </Btn>
      </div>
    </div>
    <slot />
  </Panel>
</template>

<script>
import Panel from '~/components/UI/Panel.vue'
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn, Panel },

  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },

  emits: ['click'],
}
</script>
