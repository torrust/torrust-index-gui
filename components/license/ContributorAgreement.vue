<template>
    <div>
        <Markdown :source="file" />
    </div>
    
    </template>
      
    <script setup lang="ts">

    
    const file = await fetchTextFile("contributor_agreement_v01.md");
    
    </script>
      
    <style scoped>
    
    </style>