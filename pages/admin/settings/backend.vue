<template>
  <div id="general-settings" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <div class="flex flex-col">
      <pre><code>{{ settings }}</code></pre>
    </div>
    <div class="flex flex-col">
      <span>Read-only view for the backend configuration. See <a target="_blank" href="https://docs.rs/torrust-index">the Index documentation</a> for more information.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { type Settings } from "torrust-index-types-lib";

const props = defineProps({
  settings: {
    type: Object as PropType<Settings>,
    required: true
  }
});
</script>

<style scoped>
label {
  @apply p-2 w-full font-medium text-neutral-content/50;
}

input, select {
  @apply p-2.5 w-full  text-neutral-content placeholder-neutral-content/50 border-2 border-base-content/20 rounded-2xl duration-200 cursor-pointer;
}
</style>
