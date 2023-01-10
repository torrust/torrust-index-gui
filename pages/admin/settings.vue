<template>
  <div class="w-full flex flex-col items-center">
    <div class="relative w-full h-auto flex flex-row lg:justify-center overflow-x-auto">
      <div v-for="(option) in tabs" class="relative z-10">
        <NuxtLink
          :to="`/admin/settings/${option}`"
          class="inline-block py-2 px-6 font-medium text-center text-themeText/50 capitalize hover:text-themeText border-b-2 border-transparent dark:hover:border-white/10 duration-200"
        >
          {{ option }}
        </NuxtLink>
      </div>

      <div class="min-w-full absolute bottom-0 border-b-2 border-secondary z-0" />
    </div>

    <template v-if="settings">
      <NuxtPage :settings="settingsChanges" class="mt-6 w-full" />
    </template>

    <button
      :disabled="!madeChanges() || updatingSettings"
      class="px-6 mt-8 h-12 w-full max-w-lg inline-flex justify-center items-center appearance-none bg-secondary hover:bg-accent/20 font-bold text-sm text-accent capitalize rounded-2xl cursor-pointer duration-500 disabled:bg-tertiary disabled:text-themeText/50"
      @click="saveSettings"
    >
      save changes
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Settings } from "torrust-index-types-lib";
import { getSettings, onMounted, ref, useRestApi, useRoute, watch } from "#imports";

const tabs = [
  "general",
  "tracker",
  "authentication",
  "database",
  "email"
];

const rest = useRestApi();

const updatingSettings: Ref<Boolean> = ref(false);
const settings: Ref<Settings> = ref(null);
const settingsChanges: Ref<Settings> = ref(null);

watch([settings], () => {
  // This is how you clone without references in JS...
  settingsChanges.value = JSON.parse(JSON.stringify(settings.value));
});

onMounted(() => {
  getAdminSettings();
});

function getAdminSettings () {
  rest.value.settings.getSettings()
    .then((v) => {
      settings.value = v;
    });
}

function saveSettings () {
  updatingSettings.value = true;

  rest.value.settings.updateSettings(settingsChanges.value)
    .then((v) => {
      settings.value = v;

      updatingSettings.value = false;

      getSettings();
    })
    .catch(() => {
      updatingSettings.value = false;
    });
}

function madeChanges (): boolean {
  return JSON.stringify(settingsChanges.value) !== JSON.stringify(settings.value);
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-themeText border-accent;
}
</style>
