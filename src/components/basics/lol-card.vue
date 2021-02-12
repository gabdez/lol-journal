<template>
  <v-card rounded="lg" :height="height" elevation="10" color="secondaryBis">
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      required: false
    }
  }
};
</script>

<style></style>
