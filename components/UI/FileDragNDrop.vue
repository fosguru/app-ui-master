<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg p-4"
    :class="isDragover ? 'bg-black' : 'bg-white dark:bg-stone-800'"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <input
      id="assetsFieldHandle"
      ref="file"
      type="file"
      :multiple="multiple"
      class="absolute size-px overflow-hidden opacity-0"
      :accept="accept"
      :name="name"
      @change="onChange"
    >

    <label
      for="assetsFieldHandle"
      class="block cursor-pointer text-center"
      :class="isDragover ? 'text-white' : 'text-black'"
    >
      <CloudDownloadIcon class="mb-2 inline-block size-6 text-gray-500" />
      <span class="text-medium mb-2 block dark:text-stone-200">
        Drag & drop or <span class="text-red-500">select a file</span>
      </span>
      <span class="block text-2xs text-stone-400">
        <slot name="description">
          {{ imageText }}<br>
          <span v-if="allowVideo">{{ videoText }}</span>
        </slot>
      </span>
    </label>
    <ul v-if="filelist.length" v-cloak class="mt-4">
      <li v-for="(file, idx) in filelist" :key="idx" class="p-1 text-sm">
        {{ file.name }}<button class="ml-2" type="button" title="Remove file" @click="remove(filelist.indexOf(file))">
          remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import CloudDownloadIcon from '@/components/Icons/CloudDownloadIcon'

export default {
  components: { CloudDownloadIcon },

  props: {
    modelValue: { type: [Object, Array], default: null },
    accept: { type: String, default: 'image/png,image/jpeg,video/mpeg,video/mp4' },
    imageText: { type: String, default: 'Images must be .jpg and at least 1224 × 1566 (max 5MB).' },
    videoText: { type: String, default: 'Videos must be .mpg or .mp4 (max 100MB).' },
    name: { type: String, default: '' },
    allowVideo: Boolean,
    multiple: Boolean,
  },

  emits: ['update:modelValue'],

  data: () => ({
    isDragover: false,
  }),

  computed: {
    filelist () {
      if (! this.modelValue) { return [] }
      if (this.modelValue.length) {
        return this.modelValue
      }
      return [this.modelValue]
    },
  },

  methods: {
    onChange () {
      this.$emit('update:modelValue', this.multiple ? [...this.modelValue, ...this.$refs.file.files] : this.$refs.file.files[0])
    },

    remove (i) {
      this.$emit('update:modelValue', this.multiple ? this.filelist.splice(i, 1) : null)
    },

    dragover (event) {
      event.preventDefault()
      this.isDragover = true
    },

    dragleave () {
      this.isDragover = false
    },

    drop (event) {
      event.preventDefault()
      this.isDragover = false
      this.$refs.file.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
    },
  },
}
</script>
