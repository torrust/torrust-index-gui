<template>
    <div>
        <Markdown :source="file" />
    </div>
    
    </template>
      
    <script setup lang="ts">
    
    const file = await fetchTextFile("LICENSE-MIT_0.md");
    
    </script>
      
    <style scoped>
    
    </style>