<template>
  <select :value="modelValue" class="bg-transparent pr-4" @change="e => $emit('update:modelValue', e.target.value)">
    <option v-if="placeholder" value="null">
      {{ placeholder }}
    </option>
    <option v-for="(name, val) in options" :key="val" :value="val" :selected="modelValue === val">
      {{ name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: { type: Object, required: true },
    modelValue: { type: [String, Number, Object, Boolean], default: null },
    placeholder: { type: String, default: '' },
  },

  emits: ['update:modelValue'],
}
</script>

<style scoped lang="scss">
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right -5px center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
</style>
