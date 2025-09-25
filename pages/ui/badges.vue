<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Badges
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <Badge class="bg-gray-100 uppercase text-gray-800" text="Default" />
        <Badge size="xs" class="bg-gray-100 uppercase text-gray-800" text="Small" />
        <Badge size="md" class="bg-gray-100 uppercase text-gray-800" text="Medium" />
        <Badge size="lg" class="bg-gray-100 uppercase text-gray-800" text="Large" />

        <Badge size="lg" class="bg-blue-500 text-white">
          Tag
        </Badge>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '~/components/UI/Badge.vue'

export default {
  components: { Badge },
}
</script>
