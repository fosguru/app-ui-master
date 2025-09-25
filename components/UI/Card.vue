<template>
  <div class="divide-y divide-gray-200 rounded-lg bg-white shadow dark:bg-stone-700">
    <div v-show="$slots.header" class="px-4 py-5 sm:px-6">
      <slot name="header" />
    </div>
    <div v-show="$slots.default" class="px-4 py-5 sm:p-6">
      <slot />
    </div>
    <div v-show="$slots.footer" class="p-4 sm:px-6">
      <slot name="footer" />
    </div>
  </div>
</template>
