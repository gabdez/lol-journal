<template>
  <v-card
    rounded="lg"
    :height="height"
    elevation="10"
    class="lol-card white--text"
    :max-height="maxHeight"
  >
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      required: false
    },
    maxHeight: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
.lol-card {
  background-color: rgba(50, 34, 101, 0.8) !important;
  overflow: auto;
}
</style>
