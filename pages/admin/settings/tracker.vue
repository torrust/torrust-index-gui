<template>
  <div id="tracker-settings" class="flex flex-col gap-6 max-w-lg">
    <h2 class="text-3xl font-medium text-themeText">
      Tracker Settings
    </h2>

    <div class="flex flex-col">
      <label for="tracker-announce-url">Announce URL</label>
      <input id="tracker-announce-url" v-model="settings.tracker.url" type="text" class="input">
    </div>

    <div class="flex flex-col">
      <label for="tracker-mode">Mode</label>
      <select id="tracker-mode" v-model="settings.tracker.mode" class="input">
        <template v-for="mode in TrackerMode">
          <option v-if="isNaN(mode)" :value="mode">
            {{ mode }}
          </option>
        </template>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="tracker-api-url">API URL</label>
      <input id="tracker-api-url" v-model="settings.tracker.api_url" type="text" class="input">
    </div>

    <div class="flex flex-col">
      <label for="tracker-api-token">API Token</label>
      <input id="tracker-api-token" v-model="settings.tracker.token" type="text" class="input">
    </div>

    <div class="flex flex-col">
      <label for="tracker-token-validity">New Private Tracker Key Validity (seconds)</label>
      <input id="tracker-token-validity" v-model="settings.tracker.token_valid_seconds" type="number" class="input">
    </div>
  </div>
</template>

<script setup lang="ts">
import { Settings, TrackerMode } from "torrust-index-types-lib";
import { PropType } from "vue";

const props = defineProps({
  settings: {
    type: Object as PropType<Settings>,
    required: true
  }
});
</script>

<style scoped>
label {
  @apply p-2 w-full text-themeText/50;
}

input, select {
  @apply p-2.5 w-full bg-secondary/25 text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
