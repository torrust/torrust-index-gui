<template>
  <div>
    <div class="flex flex-col w-full">
      <NavigationBar />
      <div class="my-6 mx-auto py-0 px-3 md:px-8 flex flex-col grow w-full max-w-8xl">
        <NuxtPage />
      </div>
      <!-- Footer -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "#imports";

onMounted(() => {
  document.querySelector("html").classList.add("theme-dark", "bg-primary");
})
</script>
