<template>
  <Panel>
    <div class="mb-1 text-3xl font-semibold text-stone-900 dark:text-stone-200">
      {{ name }}
    </div>
    <div class="text-sm text-stone-500 dark:text-stone-400 max-md:mb-4 lg:h-20">
      {{ description }}
    </div>
    <div class="text-3xl font-semibold text-stone-900 dark:text-stone-200">
      {{ price }}
    </div>
    <div class="mb-4 text-xs text-stone-500 dark:text-stone-400">
      Per {{ per }}
    </div>
    <ul class="mb-4 flex list-disc flex-col gap-4 pl-4 text-xs text-stone-900 dark:text-stone-300">
      <li v-for="(feature, idx) in features" :key="idx">
        {{ feature }}
      </li>
    </ul>
    <Btn class="mt-8 w-full" :loading="loading" @click="$emit('click')">
      Change to this plan
    </Btn>
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
    price: { type: String, required: true },
    per: { type: String, default: 'month' },
    features: { type: Array, required: true },
    loading: Boolean,
  },

  emits: ['click'],
}
</script>
