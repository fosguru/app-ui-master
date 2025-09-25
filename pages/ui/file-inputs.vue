<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        File inputs
      </div>
      <div class="flex flex-col  items-start gap-4">
        <FileInput multiple />
        <FileDragNDrop />
      </div>
    </div>
  </div>
</template>

<script>
import FileInput from '~/components/UI/FileInput.vue'
import FileDragNDrop from '~/components/UI/FileDragNDrop.vue'

export default {
  components: { FileDragNDrop, FileInput },

  data: () => ({

  }),
}
</script>
