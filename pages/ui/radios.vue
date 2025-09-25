<template>
  <div class="flex flex-col gap-6 p-8">
    <div>
      <div class="pb-6 font-bold">
        Radios
      </div>
      <div class="flex flex-col items-start">
        <RadioInput v-model="radio" value="1">
          Radio On
        </RadioInput>
        <RadioInput v-model="radio" value="2">
          Radio Off
        </RadioInput>
      </div>
    </div>
  </div>
</template>

<script>
import RadioInput from '~/components/UI/RadioInput'

export default {
  components: { RadioInput },

  data: () => ({
    radio: '1',
  }),
}
</script>
