<template>
  <div id="general-settings" class="flex flex-col gap-6 max-w-lg">
    <div class="flex flex-col">
      <label for="website-name">Name</label>
      <input id="website-name" v-model="settings.website.name" type="text" class="input">
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Settings } from "torrust-index-types-lib";

const props = defineProps({
  settings: {
    type: Object as PropType<Settings>,
    required: true
  }
});
</script>

<style scoped>
label {
  @apply p-2 w-full font-medium text-themeText/50;
}

input, select {
  @apply p-2.5 w-full bg-secondary/25 text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
