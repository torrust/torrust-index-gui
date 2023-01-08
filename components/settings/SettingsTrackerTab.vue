<template>
  <div id="tracker-settings" class="flex flex-col gap-6 max-w-lg">

    <h2 class="text-3xl font-medium text-slate-200 dark:text-dark-200">Tracker Settings</h2>

    <div class="flex flex-col">
      <label for="tracker-announce-url">Announce URL</label>
      <input type="text" id="tracker-announce-url" class="input" v-model="settings.tracker.url">
    </div>

    <div class="flex flex-col">
      <label for="tracker-mode">Mode</label>
      <select id="tracker-mode" class="input" v-model="settings.tracker.mode">
        <template v-for="mode in TrackerMode">
          <option v-if="isNaN(mode)" :value="mode">{{ mode }}</option>
        </template>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="tracker-api-url">API URL</label>
      <input type="text" id="tracker-api-url" class="input" v-model="settings.tracker.api_url">
    </div>

    <div class="flex flex-col">
      <label for="tracker-api-token">API Token</label>
      <input type="text" id="tracker-api-token" class="input" v-model="settings.tracker.token">
    </div>

    <div class="flex flex-col">
      <label for="tracker-token-validity">New Private Tracker Key Validity (seconds)</label>
      <input type="number" id="tracker-token-validity" class="input" v-model="settings.tracker.token_valid_seconds">
    </div>

  </div>
</template>

<script setup lang="ts">
import {Settings, TrackerMode} from "torrust-index-types-lib";
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  settings: {
    type: Object as PropType<Settings>,
    required: true
  }
})
</script>

<style scoped>
label {
  @apply p-2 w-full text-themeText/50;
}

input, select {
  @apply p-2.5 w-full bg-secondary/25 text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
