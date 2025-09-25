<template>
  <span class="inline-block w-10 align-middle">
    <img
      v-if="type === 'marketo'"
      src="~assets/images/connections/marketo.jpg"
      width="98"
      height="70"
      alt=""
      class="max-w-full"
    >
    <img
      v-if="type === 'salesforce'"
      src="~assets/images/connections/salesforce.png"
      width="79"
      height="56"
      alt=""
      class="max-w-full"
    >
  </span>
</template>

<script>
export default {
  components: { },

  props: {
    type: { type: String, required: true },
  },
}
</script>
