<template>
  <button
    class="px-6 h-12 w-full inline-flex justify-center items-center appearance-none bg-primary-dark hover:bg-primary font-semibold text-sm text-neutral-content capitalize rounded-2xl cursor-pointer duration-500 disabled:bg-base-300 disabled:text-neutral-content/50"
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
