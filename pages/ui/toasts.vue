<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-4 font-bold">
        Toasts
      </div>
      <div class="flex flex-col items-start gap-4">
        <Btn
          @click="$notify({
            title: 'Success',
            text: 'Data was saved successfully.',
            type: 'info',
          })"
        >
          Info toast
        </Btn>
        <Btn
          color="red"
          @click="$notify({
            title: 'Error',
            text: 'Some error occured.',
            type: 'error',
          })"
        >
          Error toast
        </Btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '~/components/UI/Btn.vue'

export default {
  components: { Btn },

  data: () => ({
    checkbox1: false,
  }),
}
</script>
