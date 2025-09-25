<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg border border-gray-300 p-6"
    :class="isDragover ? 'bg-indigo-600 text-white' : 'bg-gray-100'"
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
      @change="onChange"
    >

    <label
      for="assetsFieldHandle"
      class="flex w-full cursor-pointer items-center justify-center"
      :class="isDragover ? 'text-white' : 'text-black'"
    >
      <span class="text-center">
        <span class="text-medium mb-2 block text-sm">
          <span :class="isDragover ? 'text-white' : 'text-indigo-700'">Upload files </span>
          <span class="max-md:hidden">or drag and drop images</span>
        </span>
        <span class="block text-2xs" :class="isDragover ? 'text-white' : 'text-gray-500'">
          <slot name="description">
            {{ helpText }}<br>
          </slot>
        </span>
      </span>
    </label>

    <ul v-if="filelist.length && showFilelist" v-cloak class="mt-4">
      <li v-for="(file, idx) in filelist" :key="idx" class="p-1 text-sm">
        {{ file.name }}<button class="ml-2" type="button" title="Remove file" @click="remove(filelist.indexOf(file))">
          remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: [Object, Array], default: null },
    accept: { type: String, default: 'image/png,image/jpeg,video/mpeg,video/mp4' },
    helpText: { type: String, default: 'Images must be .jpg and at least 1224 × 1566 (max 5MB)' },
    allowVideo: Boolean,
    multiple: Boolean,
    showFilelist: Boolean,
  },

  emits: ['files', 'update:modelValue'],

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
      this.$emit('files', this.$refs.file.files)
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
