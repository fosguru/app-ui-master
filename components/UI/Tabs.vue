<template>
  <div>
    <div class="sm:hidden">
      <InputGroup
        type="select"
        class="mb-2 w-full"
        no-error-icon
        :model-value="current"
        :options="selectOptions"
        @update:model-value="v => changeTab(v)"
      />
    </div>
    <div class="hidden sm:block" role="tablist">
      <div>
        <nav class="-mb-px flex space-x-4" aria-label="Tabs">
          <a
            v-for="(tab, name) in availableTabs"
            :key="name"
            role="button"
            class="whitespace-nowrap border-b-2 border-transparent px-1 pb-4 text-sm font-medium"
            :class="current === name ? '!border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            @click="changeTab(name)"
          >
            {{ tab.title }}
            <span v-if="tab.hasError" class="mb-0.5 ml-1 inline-block size-2 rounded-full bg-red-600 align-middle" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import mapValues from 'lodash/mapValues'
import pickBy from 'lodash/pickBy'
import InputGroup from '@/components/UI/InputGroup'

export default {
  components: { InputGroup },

  props: {
    modelValue: { type: String, required: true },
    default: { type: String, required: true },
    tabs: { type: Object, required: true },
  },

  emits: ['update:modelValue'],

  computed: {
    current () {
      return this.$route.query.tab || this.default
    },

    selectOptions () {
      return mapValues(this.tabs, t => t.title + (t.hasError ? ' ●' : ''))
    },

    availableTabs () {
      return pickBy(this.tabs, t => t.title)
    },
  },

  mounted () {
    this.$emit('update:modelValue', this.current)
  },

  methods: {
    changeTab (name) {
      if (name === this.default) {
        this.$router.replace({ path: this.$route.path, query: { } })
      } else {
        this.$router.push({ path: this.$route.path, query: { tab: name } })
      }
      this.$emit('update:modelValue', name)
    },
  },
}
</script>
