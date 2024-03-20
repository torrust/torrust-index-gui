<template>
  <div>
      <Markdown :source="file" />
  </div>
  
  </template>
    
  <script setup lang="ts">
  
  const file = await fetchTextFile("LICENSE-AGPL_3_0.md");
  
  </script>
    
  <style scoped>
  
  </style>