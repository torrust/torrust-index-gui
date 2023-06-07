<template>
  <div data-theme="torrust">
    <Notifications />

    <NavigationBar />

    <div class="bg-base-300 px-4 md:px-8 lg:px-24 flex flex-col w-full">
      <AuthenticationModal />

      <div class="my-6 flex flex-col" style="max-width: 100vw;">
        <NuxtPage />
      </div>
      <!-- Footer -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategories, getSettings, getTags, getUser, onBeforeMount, onMounted } from "#imports";
import Notifications from "~/components/Notifications.vue";

onBeforeMount(() => {
  getUser();
  getSettings();
  getTags();
  getCategories();
});

onMounted(() => {
  document.querySelector("html").classList.add("bg-base-300");
});
</script>
