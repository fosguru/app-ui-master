<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="py-6 font-bold">
        Tooltips
      </div>
      <div class="flex flex-wrap items-start gap-4">
        <Btn v-tooltip="'Some tooltip'">
          Default
        </Btn>
        <Btn v-tooltip="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'">
          Large
        </Btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn },
}
</script>
