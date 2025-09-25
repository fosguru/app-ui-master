import type { ComputedRef, Ref } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import { renderLines } from './utils'

import type { Lines, Meta, Mode, Theme, VirtualScroll } from './types'

interface Props {
  mode: Mode
  theme: Theme
  language: string
  prev: string
  current: string
  folding: boolean
  inputDelay: number
  virtualScroll: boolean | VirtualScroll
}

export function useRender (props: Props,
  viewer: Ref<null | HTMLElement>,
  scrollOptions: ComputedRef<false | VirtualScroll>) {
  const render = ref<Array<Lines>>([])
  const meta = ref<Array<Meta>>([])
  const list = computed(() => {
    return meta.value.filter((item, idx) => {
      const includeOneAfterPadding = ! meta.value[idx + 1]?.foldable || ! meta.value[idx - 1]?.foldable

      return props.folding ? ((! item.foldable || item.padding || includeOneAfterPadding) && item.visible) : item.visible
    })
  })

  const setRender = () => {
    render.value = renderLines(props.mode, props.prev, props.current)
    meta.value.splice(render.value.length)

    render.value.forEach((v, index: number) => {
      const item = meta.value[index]

      const hasNonEqualInPadding = [...Array(props.foldingLinePadding).keys()].find((i) => {
        const before = render.value[Math.max(0, index - (i + 1))]
        const after = render.value[Math.max(0, index + (i + 1))]
        return (before && before[0].type !== 'equal') || (after && after[0].type !== 'equal')
      }) !== undefined

      const foldable
        = props.folding
        && v[0].type === 'equal'

      const values = {
        index,
        foldable,
        padding: hasNonEqualInPadding,
        visible: true,
      }

      if (scrollOptions.value) {
        meta.value[index] = {
          ...values,
          visible: item?.visible || false,
          top: item?.top || undefined,
          height: item?.height || scrollOptions.value.lineMinHeight,
        }
      } else {
        meta.value[index] = { ...values }
      }
    })
  }

  watch(
    [
      () => props.mode,
      () => props.prev,
      () => props.current,
      () => props.folding,
    ],
    setRender,
    {
      debounce: props.inputDelay,
      immediate: true,
    },
  )

  return {
    meta,
    render,
    list,
  }
}

export function useVirtualScroll (props: Props,
  viewer: Ref<null | HTMLElement>,
  scrollOptions: ComputedRef<false | VirtualScroll>,
  meta: Ref<Array<Meta>>) {
  const minHeight = computed(() => {
    if (! scrollOptions.value) { return undefined }
    const reduce = meta.value.reduce((acc, curr) => {
      curr.top = acc
      return curr.foldable ? acc : acc + (curr.height as number)
    }, 0)
    return `${reduce}px`
  })

  const setMeta = () => {
    if (! viewer.value || ! scrollOptions.value) { return }
    const scrollTop = viewer.value.scrollTop
    const height = scrollOptions.value.height
    const min = scrollTop - height * 1.5
    const max = scrollTop + height + height * 1.5

    meta.value.reduce((acc, curr) => {
      if (acc >= min && acc <= max) {
        curr.visible = true
      } else {
        curr.visible = false
      }

      curr.top = acc
      return curr.foldable ? acc : acc + (curr.height as number)
    }, 0)
  }

  watch(
    [
      () => props.mode,
      () => props.prev,
      () => props.current,
      () => props.folding,
    ],
    () => nextTick(setMeta),
    {
      debounce: props.inputDelay,
      immediate: true,
    },
  )

  // onMounted(() => {
  //   if (! scrollOptions.value) { return }
  //   viewer.value?.addEventListener(
  //     'scroll',
  //     useThrottleFn(setMeta, scrollOptions.value.delay),
  //   )
  // })

  // onBeforeUnmount(() => {
  //   if (! scrollOptions.value) { return }
  //   viewer.value?.removeEventListener(
  //     'scroll',
  //     useThrottleFn(setMeta, scrollOptions.value.delay),
  //   )
  // })

  // watch(scrollOptions, (val, prev) => {
  //   if (! prev && val) {
  //     viewer.value?.addEventListener(
  //       'scroll',
  //       useThrottleFn(setMeta, val.delay),
  //     )
  //   }
  //   if (prev && ! val) {
  //     viewer.value?.removeEventListener(
  //       'scroll',
  //       useThrottleFn(setMeta, prev.delay),
  //     )
  //   }
  // })

  return {
    minHeight,
  }
}
