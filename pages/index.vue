<template>
  <!-- Your component's HTML goes here -->
  <span>Redirecting...</span>
</template>

<script setup lang="ts">
import { navigateTo, onBeforeMount } from "#imports";

onBeforeMount(async () => {
  await navigateTo("/torrents", { replace: true });
});
</script>

<style scoped>

</style>
