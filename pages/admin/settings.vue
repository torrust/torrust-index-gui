<template>
  <div class="flex flex-col">
    <div id="torrent-view" class="flex flex-col lg:flex-row">
      <div class="flex flex-col basis-1/6">
        <div class="px-6 flex flex-col items-start top-24 sticky">
          <h1 class="mb-6 text-left text-3xl font-semibold text-themeText">
            Settings
          </h1>
          <ul>
            <li v-for="tab in tabs" class="mb-1">
              <NuxtLink
                :to="`/admin/settings/${tab}`"
                class="inline-flex py-2 font-medium text-2xl text-center text-themeText/50 hover:text-themeText capitalize border-b-2 border-transparent duration-200"
              >
                {{ tab }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="lg:ml-8 flex flex-col flex-auto items-center">
        <div class="w-full flex flex-col grow">
          <div class="flex flex-col items-center">
            <div class="w-full flex flex-col">
              <template v-if="settings">
                <NuxtPage :settings="settingsChanges" />
              </template>

              <button
                :disabled="!madeChanges() || updatingSettings"
                class="px-6 mt-8 h-12 inline-flex justify-center items-center self-start appearance-none bg-accent hover:bg-accent-dark text-themeText font-medium rounded-2xl cursor-pointer duration-200 disabled:bg-gray-600"
                @click="saveSettings"
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
  @apply text-themeText;
}
</style>
