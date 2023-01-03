<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrent-view" class="px-2 flex flex-col lg:flex-row">
        <div class="flex flex-col basis-1/5 items-center">
          <div class="flex flex-col items-start top-24 sticky max-w-md">
            <h1 class="mb-6 text-left text-4xl font-semibold text-slate-200 dark:text-dark-200">Settings</h1>
            <ul>
              <li v-for="tab in tabs()" class="mb-1">
                <router-link
                    :to="tab.path"
                    class="inline-flex py-2 font-medium text-2xl text-center text-slate-400 dark:text-dark-400 hover:text-slate-200 dark:hover:text-dark-200 border-b-2 border-transparent duration-200"
                    style="margin-bottom: -2px;"
                    :class="{ 'active': route.path === tab.path }"
                >
                  {{ tab.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:ml-8 flex flex-col flex-auto items-center">
          <div class="w-full flex flex-col grow">
            <div class="flex flex-col items-center">
              <div class="w-full flex flex-col">

<!--                <button-->
<!--                    @click="saveSettings"-->
<!--                    :disabled="settingsUpdated || savingSettings"-->
<!--                    class="px-6 mt-8 h-12 inline-flex justify-center items-center self-start appearance-none bg-sky-500 dark:bg-dark-accent-600 hover:bg-sky-600 dark:hover:bg-dark-accent-700 text-white font-medium rounded-2xl cursor-pointer duration-200 disabled:opacity-50"-->
<!--                >-->
<!--                  Save-->
<!--                </button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "@vue/reactivity";
import {onMounted, ref, useRoute} from "#imports";

enum Tab {
  General,
  Tracker,
  Authentication,
  Database,
  Email
}

const route = useRoute();

const tab: Ref<Tab> = ref(Tab.General);

onMounted(async () => {
  await getTorrentFromApi(route.params.tab);
})

function tabs() {
  let tabs = [];

  for (let tab of Object.keys(Tab)) {
    let entry = {
      name: tab,
      path: `settings/${tab.toLowerCase()}`
    }

    tabs.push(entry);
  }

  return tabs;
}
</script>

<style scoped>

</style>
