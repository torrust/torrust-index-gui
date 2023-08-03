<template>
  <button
    :data-cy="props.dataCy"
    class="inline-flex items-center justify-center w-full h-12 px-6 capitalize duration-500 appearance-none cursor-pointer btn btn-primary rounded-2xl disabled:bg-neutral-600 disabled:text-neutral-content/50"
    :label="label"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
    default: () => ""
  },
  // https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
  dataCy: {
    type: String,
    required: false,
    default: () => ""
  }
});
</script>

<style scoped>

</style>
