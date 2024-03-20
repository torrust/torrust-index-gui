<template>
<div>
    <Markdown :source="file" />
</div>

</template>
  
<script setup lang="ts">

const file = await fetchTextFile("COPYRIGHT.md");

</script>
  
<style scoped>
</style>