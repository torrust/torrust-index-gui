<template>
  <button
    class="px-6 h-12 btn btn-primary w-full inline-flex justify-center items-center appearance-none capitalize rounded-2xl cursor-pointer duration-500 disabled:bg-neutral-600 disabled:text-neutral-content/50"
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
