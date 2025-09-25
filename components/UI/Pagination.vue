<template>
  <div v-if="total > 0" class="flex items-center justify-between px-4 sm:px-0">
    <div v-if="lastPage > 1" class="flex flex-1 justify-between sm:hidden">
      <Btn
        color="white"
        :disabled="currentPage === 1"
        :loading="loading && clickedPage < currentPage"
        @click="change(currentPage - 1)"
      >
        Previous
      </Btn>
      <Btn
        color="white"
        :disabled="currentPage === lastPage"
        :loading="loading && clickedPage > currentPage"
        @click="change(currentPage + 1)"
      >
        Next
      </Btn>
    </div>

    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-stone-400">
          Showing
          <span class="font-medium">{{ firstItemOnCurrentPage }}</span>
          to
          <span class="font-medium">{{ lastItemOnCurrentPage }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          results
        </p>
      </div>

      <div v-if="lastPage > 1">
        <nav class="isolate inline-flex -space-x-px overflow-hidden rounded-md border shadow-sm dark:border-stone-700" aria-label="Pagination">
          <button
            type="button"
            class="relative inline-flex items-center rounded-l-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-900"
            :class="{ 'cursor-not-allowed': currentPage === 1 }"
            :disabled="currentPage === 1"
            @click="change(currentPage - 1)"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="size-5" aria-hidden="true" />
          </button>
          <button
            v-for="page in pageRange"
            :key="page"
            type="button"
            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
            :class="page === currentPage ? 'bg-red-500 z-10 text-white cursor-not-allowed' : 'text-gray-900 bg-white hover:bg-gray-50 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-900'"
            :disabled="page === '...'"
            @click="change(page)"
          >
            <SpinnerIcon v-if="loading && page === clickedPage" class="absolute left-1/2 -ml-2 size-4" />
            <span :class="loading && page === clickedPage ? 'invisible' : ''">{{ page }}</span>
          </button>
          <button
            type="button"
            class="relative inline-flex items-center rounded-l-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-900"
            :class="{ 'cursor-not-allowed': currentPage === lastPage }"
            :disabled="currentPage === lastPage"
            @click="change(currentPage + 1)"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="size-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChevronRightIcon from '~/components/Icons/ChevronRightIcon.vue'
import ChevronLeftIcon from '~/components/Icons/ChevronLeftIcon.vue'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'
import Btn from '~/components/UI/Btn.vue'

export default defineComponent({
  components: { Btn, SpinnerIcon, ChevronRightIcon, ChevronLeftIcon },

  props: {
    total: { type: Number, default: 0 },
    limit: { type: Number, default: 100 },
    offset: { type: Number, default: 0 },
    midLimit: { type: Number, default: 1 },
    edgeLimit: { type: Number, default: 1 },
    loading: Boolean,
  },

  emits: ['change'],

  data: () => ({
    clickedPage: 1,
  }),

  computed: {
    currentPage () {
      return Math.ceil(this.offset / this.limit) + 1
    },

    lastPage () {
      return Math.ceil(this.total / this.limit)
    },

    firstItemOnCurrentPage () {
      return this.offset + 1
    },

    lastItemOnCurrentPage () {
      return (this.offset + this.limit) > this.total ? this.total : (this.offset + this.limit)
    },

    pageRange () {
      const current = this.currentPage
      const size = this.limit
      const last = this.lastPage
      const midDelta = this.midLimit
      const edgeDelta = this.edgeLimit
      const left = current - midDelta
      const right = current + midDelta
      const leftPad = (midDelta + 2) * 2
      const rightPad = ((midDelta + 2) * 2) - 1
      const range = []
      const pages: any[] = []
      let l: number

      for (let i = 1; i <= last; i++) {
        if (i <= 1 + edgeDelta || i >= last - edgeDelta) {
          // Item is first or last within edgeDelta
          range.push(i)
        } else if (i >= left && i <= right) {
          // Item is within the midDelta
          range.push(i)
        } else if (size && i < leftPad && current < leftPad - 2) {
          // Item is before max left padding
          range.push(i)
        } else if (size && i > last - rightPad && current > last - rightPad + 2) {
          // Item is after max right padding
          range.push(i)
        }
      }

      range.forEach((i) => {
        if (l) {
          if (i - l === 2) {
            pages.push(l + 1)
          } else if (i - l !== 1) {
            pages.push('...')
          }
        }
        pages.push(i)
        l = i
      })

      return pages
    },
  },

  methods: {
    change (page: number) {
      this.clickedPage = page
      this.$emit('change', page)
    },
  },
})
</script>
