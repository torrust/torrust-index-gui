<template>

</template>

<script setup lang="ts">
import {navigateTo, onBeforeMount} from "#imports";

onBeforeMount(async () => {
  await navigateTo("/torrents", {replace: true})
})
</script>

<style scoped>

</style>
