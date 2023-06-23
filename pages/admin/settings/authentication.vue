<template>
  <div id="general-settings" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <div class="flex flex-col">
      <label for="authentication-email-signup">Email Requirement</label>
      <select id="authentication-email-signup" v-model="settings.auth.email_on_signup">
        <template v-for="option in EmailOnSignup">
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
import { Settings, EmailOnSignup } from "torrust-index-types-lib";

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
  @apply p-2.5 w-full text-neutral-content placeholder-neutral-content/50 border-2 border-base-content/20 rounded-2xl duration-200 cursor-pointer;
}
</style>
