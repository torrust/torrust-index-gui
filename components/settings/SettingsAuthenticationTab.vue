<template>
  <div id="general-settings" class="flex flex-col gap-6 max-w-lg">
    <h2 class="text-3xl font-medium text-themeText">
      Authentication Settings
    </h2>

    <div class="flex flex-col">
      <label for="authentication-email-signup">Email Requirement</label>
      <select id="authentication-email-signup" v-model="settings.auth.email_on_signup">
        <template v-for="option in Requirement">
          <option v-if="isNaN(option)" :value="option">
            {{ option }}
          </option>
        </template>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Settings, Requirement } from "torrust-index-types-lib";

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
