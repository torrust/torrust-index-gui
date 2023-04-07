<template>
  <div class="flex flex-col gap-10">
    <div class="">
      <h2 class="text-2xl font-semibold text-neutral-content capitalize">
        admin settings
      </h2>
    </div>
    <div class="w-full flex flex-col gap-10">
      <div class="relative w-full h-auto flex flex-row overflow-x-auto">
        <div v-for="(option) in tabs" class="relative z-10">
          <NuxtLink
            :to="`/admin/settings/${option}`"
            class="inline-block py-2 px-6 font-medium text-center text-neutral-content/50 capitalize hover:text-neutral-content border-b-2 border-transparent dark:hover:border-white/10 duration-200"
          >
            {{ option }}
          </NuxtLink>
        </div>

        <div class="min-w-full absolute bottom-0 border-b-2 border-base-content/20 z-0" />
      </div>

      <template v-if="settings">
        <NuxtPage :settings="settingsChanges" class="w-full" />
      </template>

      <div class="w-full flex flex-col gap-2">
        <template v-if="madeChanges()">
          <TorrustButton
            label="save changes"
            :disabled="!madeChanges() || updatingSettings"
            @click="saveSettings()"
          />

          <TorrustButton
            class="hover:bg-red-500/20 text-red-500"
            label="clear changes"
            :disabled="!madeChanges() || updatingSettings"
            @click="clearChanges()"
          />
        </template>
      </div>
    </div>
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
  clearChanges();
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

function clearChanges () {
  // This is how you clone without references in JS...
  settingsChanges.value = JSON.parse(JSON.stringify(settings.value));
}

function madeChanges (): boolean {
  return JSON.stringify(settingsChanges.value) !== JSON.stringify(settings.value);
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-neutral-content border-primary;
}
</style>
