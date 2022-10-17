<template>
  <div id="general-settings" class="flex flex-col gap-6">

    <h2 class="text-3xl font-medium text-slate-200 dark:text-dark-200">General Settings</h2>

    <div>
      <label for="website-name" class="input-label">Name</label>
      <input type="text" id="website-name" class="input" v-model="settings.website.name">
    </div>

  </div>
</template>

<script>
export default {
  name: "GeneralSettings",
  props: ['settings'],
}
</script>

<style scoped>

</style>
