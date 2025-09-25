<template>
  <div
    class="relative w-full overflow-auto ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10"
    :class="{ shadow: !noShadow, 'md:rounded-lg': !noRounded }"
  >
    <table class="min-w-full">
      <thead v-if="!hideHeaders">
        <tr class="bg-stone-200 dark:bg-stone-800">
          <th v-if="checkboxes" class="z-2 sticky top-0 w-7 p-0 text-left text-sm font-semibold text-stone-500 dark:text-stone-300">
            <div class="size-full whitespace-nowrap bg-stone-200 py-2 pl-4 pr-0.5  dark:bg-stone-800 sm:pl-6">
              <Checkbox size="lg" :model-value="allChecked" :disabled="disabled" @update:model-value="toggleAll" />
            </div>
          </th>
          <th
            v-for="(col, idx) in headers"
            :key="idx"
            scope="col"
            class="z-2 sticky top-0 p-0 text-left text-sm font-semibold text-stone-500 dark:text-stone-300"
            :class="[idx === 0 && fixFirstColumn ? 'z-3 left-0' : '', col.class]"
          >
            <div
              class="size-full whitespace-nowrap bg-stone-200 px-4 py-2 dark:bg-stone-800 dark:text-stone-300 sm:px-6"
              :class="[idx === 0 && fixFirstColumn ? '' : '', col.innerClass]"
            >
              <slot :name="`header-${col.name || col.value}`">
                <span v-if="col.text === ''">&nbsp;</span>
                <span v-else>{{ col.text }}</span>
              </slot>
            </div>
          </th>
          <th v-if="sortable" class="z-2 sticky top-0 w-10 p-0 text-left text-sm font-semibold text-stone-500 dark:text-stone-300">
            <div class="size-full whitespace-nowrap bg-stone-200 p-2 dark:bg-stone-800 sm:px-6">
              &nbsp;
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="loading || (!rows.length && !loading)">
        <tr v-if="loading">
          <td :colspan="headers.length + (checkboxes ? 1 : 0) + (sortable ? 1 : 0)" class="bg-white py-6 text-center dark:bg-stone-800">
            <SpinnerIcon class="inline-block size-6" />
          </td>
        </tr>
        <tr v-if="!rows.length && !loading">
          <td :colspan="headers.length + (checkboxes ? 1 : 0) + (sortable ? 1 : 0)" class="bg-white dark:bg-stone-700">
            <EmptyState />
          </td>
        </tr>
      </tbody>
      <Draggable
        v-else
        :model-value="rows"
        handle=".draggable"
        :item-key="item => checkedByIdx ? rows.indexOf(item) : checkboxesValue"
        tag="tbody"
        :animation="200"
        @update:model-value="dragChange"
      >
        <template #item="{ element: row, index: idx }">
          <tr class="row">
            <td v-if="checkboxes" class="p-0" :class="idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800'">
              <div
                class="size-full whitespace-nowrap py-4 pl-4 pr-0.5 sm:pl-6"
                :class="[idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800']"
              >
                <Checkbox size="lg" :model-value="isChecked(row, idx)" :disabled="disabled" @update:model-value="checked => toggleRow(row, idx, checked)" />
              </div>
            </td>
            <td
              v-for="(col, i) in headers"
              :key="i"
              class="p-0"
              :class="[i === 0 && fixFirstColumn ? 'z-1 sticky left-0' : '', idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800', col.class]"
            >
              <div
                class="size-full whitespace-nowrap p-4 text-sm dark:text-stone-300 sm:px-6"
                :class="[i === 0 && fixFirstColumn ? 'border-r border-gray-200 dark:border-gray-600' : '', idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800', col.innerClass]"
              >
                <slot :name="`col-${col.name || col.value}`" :row="row" :cell="typeof col.value === 'function' ? col.value(row) : get(row, col.value)" :idx="idx" :i="i">
                  <span v-html="typeof col.value === 'function' ? col.value(row) : get(hightlight(row), col.value)" />
                </slot>
              </div>
            </td>
            <td v-if="sortable" class="draggable p-0" :class="[idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800']">
              <div
                class="size-full cursor-pointer whitespace-nowrap py-4 pr-4 text-sm sm:pr-6"
                :class="[idx % 2 === 0 ? 'bg-white dark:bg-stone-700' : 'bg-gray-50 dark:bg-stone-800']"
              >
                <MenuIcon class="size-6 text-gray-400 dark:text-gray-500" />
              </div>
            </td>
          </tr>
        </template>
      </Draggable>
      <slot name="tfoot" />
    </table>
    <slot name="append" />
  </div>
</template>

<script>
import get from 'lodash/get'
import differenceBy from 'lodash/differenceBy'
import Draggable from 'vuedraggable'
import fuseHightlight from '@/utils/fuse-highlight'
import EmptyState from '@/components/UI/EmptyState'
import Checkbox from '@/components/UI/Checkbox'
import MenuIcon from '@/components/Icons/MenuIcon'
import SpinnerIcon from '~/components/Icons/SpinnerIcon.vue'

export default {
  components: { SpinnerIcon, MenuIcon, Checkbox, EmptyState, Draggable },

  props: {
    headers: { type: Array, required: true },
    rows: { type: Array, required: true },
    fixFirstColumn: Boolean,
    checkboxes: Boolean,
    checked: { type: Array, default: null },
    checkedByIdx: Boolean,
    checkboxesValue: { type: String, default: 'uuid' },
    disabled: Boolean,
    loading: Boolean,
    isFuse: Boolean,
    sortable: Boolean,
    noShadow: Boolean,
    noRounded: Boolean,
    hideHeaders: Boolean,
  },

  emits: ['sorted', 'update:checked'],

  computed: {
    allChecked () {
      if (this.checkedByIdx) {
        return this.checked && this.checked.length !== 0 && this.checked.length === this.rows.length
      } else {
        return !! (this.checked && this.checked.length && this.rows.every((row) => {
          // This is a workaround for a fuse seach result that wraps object into "item" property
          const idVal = (this.isFuse && row.item) ? row.item[this.checkboxesValue] : row[this.checkboxesValue]
          return this.checked.find(uuid => uuid === idVal)
        }))
      }
    },
  },

  methods: {
    hightlight (row) {
      if (row && row.item && row.matches) {
        return fuseHightlight(row, '<span class="bg-blue-200">', '</span>')
      }

      return row
    },

    get,

    isChecked (row, idx) {
      if (this.checkedByIdx) {
        return this.checked.find(i => i === idx) !== undefined
      } else {
        // This is a workaround for a fuse seach result that wraps object into "item" property
        const idVal = (this.isFuse && row.item) ? row.item[this.checkboxesValue] : row[this.checkboxesValue]
        return this.checked.find(uuid => idVal === uuid) !== undefined
      }
    },

    toggleAll (checked) {
      if (checked) {
        if (this.checkedByIdx) {
          this.$emit('update:checked', [...this.rows.keys()])
        } else {
          this.$emit('update:checked', this.rows.map((r) => {
            // This is a workaround for a fuse seach result that wraps object into "item" property
            return (this.isFuse && r.item) ? r.item[this.checkboxesValue] : r[this.checkboxesValue]
          }))
        }
      } else {
        this.$emit('update:checked', [])
      }
    },

    toggleRow (row, idx, checked) {
      if (this.checkedByIdx) {
        const i = this.checked.indexOf(idx)
        if (checked && i === -1) {
          this.$emit('update:checked', [...this.checked, idx])
        }
        if (! checked && i !== -1) {
          this.$emit('update:checked', differenceBy(this.checked, [idx]))
        }
      } else {
        // This is a workaround for a fuse seach result that wraps object into "item" property
        const idVal = (this.isFuse && row.item) ? row.item[this.checkboxesValue] : row[this.checkboxesValue]
        const i = this.checked.indexOf(idVal)
        if (checked && i === -1) {
          this.$emit('update:checked', [...this.checked, idVal])
        }
        if (! checked && i !== -1) {
          this.$emit('update:checked', differenceBy(this.checked, [idVal]))
        }
      }
    },

    dragChange (rows) {
      this.$emit('sorted', rows)
    },
  },
}
</script>

<style scoped>
:deep(.sortable-ghost) {
  opacity: 0.25;
}
</style>
