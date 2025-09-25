<template>
  <div class="mx-auto py-10 text-center">
    <!-- <PhFolderSimplePlus class="mb-2 inline-block size-7 text-gray-400" /> -->
    <p class="mb-2 text-xs font-medium">
      {{ title }}
    </p>
    <p class="text-xs opacity-70">
      {{ subtitle }}
    </p>
  </div>
</template>

<script>
// import FolderAddIcon from '@/components/Icons/FolderAddIcon'

export default {
  // components: { PhFolderSimplePlus },

  props: {
    title: { type: String, default: 'No results' },
    subtitle: { type: String, default: 'Nothing here yet...' },
  },
}
</script>
