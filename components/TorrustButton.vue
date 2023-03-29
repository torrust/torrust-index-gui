<template>
  <button
    class="px-6 h-12 w-full inline-flex justify-center items-center appearance-none bg-accent-dark hover:bg-accent font-semibold text-sm text-themeText capitalize rounded-2xl cursor-pointer duration-500 disabled:bg-secondary disabled:text-themeText/50"
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
  }
});
</script>

<style scoped>

</style>
