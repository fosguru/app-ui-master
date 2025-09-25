<template>
  <div
    ref="line"
    class="vue-diff-row"
    :class="`vue-diff-row-${mode}`"
    :style="rowStyle"
  >
    <!-- split view -->
    <template v-if="mode === 'split'">
      <template v-for="(ln, index) in render" :key="index">
        <template v-if="isFoldLine">
          <div class="lineNum vue-diff-cell-fold" />
          <div class="code vue-diff-cell-fold" />
        </template>
        <template v-else>
          <div class="lineNum" :class="`vue-diff-cell-${ln.type}`">
            {{ ln.lineNum }}
          </div>
          <div class="code" :class="`vue-diff-cell-${ln.type}`">
            <Code
              :language="language"
              :code="setCode(ln, render, index)"
              :scroll-options="scrollOptions"
              @rendered="rendered"
            />
          </div>
        </template>
      </template>
    </template>
    <!-- // split view -->
    <!-- unified view -->
    <template v-if="mode === 'unified'">
      <template v-if="isFoldLine">
        <div class="lineNum vue-diff-cell-fold" />
        <div class="code vue-diff-cell-fold" />
      </template>
      <template v-else>
        <div class="lineNum" :class="`vue-diff-cell-${render[0].type}`">
          {{ render[0].lineNum }}
        </div>
        <div class="code" :class="`vue-diff-cell-${render[0].type}`">
          <Code
            :language="language"
            :code="setCode(render[0])"
            :scroll-options="scrollOptions"
            @rendered="rendered"
          />
        </div>
      </template>
    </template>
    <!-- // unified view -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import Code from './Code.vue'
import { renderWords } from './utils'

import type { Line, Lines, Meta, Mode, VirtualScroll } from './types'

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Code,
  },

  props: {
    mode: {
      type: String as PropType<Mode>,
      required: true,
    },

    folding: {
      type: Boolean,
      default: false,
    },

    language: {
      type: String,
      required: true,
    },

    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },

    render: {
      type: Object as PropType<Lines>,
      required: true,
    },

    scrollOptions: {
      type: [Boolean, Object] as PropType<false | VirtualScroll>,
      default: false,
    },
  },

  emits: ['setLineHeight'],

  setup (props, { emit }) {
    const line = ref<null | HTMLElement>(null)
    const rowStyle = computed(() => {
      if (! props.scrollOptions) { return undefined }
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(0, ${props.meta.top}px, 0)`,
        minHeight: `${props.scrollOptions.lineMinHeight}px`,
      } as const
    })
    const isFoldLine = computed(
      () => props.folding && (props.render[0].type === 'equal' && ! props.meta.padding),
    )

    const setCode = (line: Line, render?: Lines, index?: number) => {
      if (! line.value) { return '\n' }

      // Compare lines when render, index properties exist and has chkWords value in line property
      if (
        typeof render === 'undefined'
          || typeof index === 'undefined'
          || ! line.chkWords
      ) {
        return line.value
      }

      const differ = render[index === 0 ? 1 : 0]

      if (! differ.value) { return line.value }

      return renderWords(differ.value, line.value) // render with modified tags
    }

    const rendered = () => {
      if (! line.value || props.meta.height === line.value.offsetHeight) { return }
      emit('setLineHeight', props.meta.index, line.value.offsetHeight)
    }

    // if (props.scrollOptions) {
    //   useResizeObserver(
    //     line,
    //     useThrottleFn(() => {
    //       if (! line.value || props.meta.height === line.value.offsetHeight) { return }
    //       emit('setLineHeight', props.meta.index, line.value.offsetHeight)
    //     }, props.scrollOptions.delay),
    //   )
    // }

    return { line, isFoldLine, rendered, rowStyle, setCode }
  },
})
</script>
