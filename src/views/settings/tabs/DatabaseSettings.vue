<template>
  <div id="database-settings" class="flex flex-col gap-6">

    <h2 class="text-3xl font-medium text-slate-200 dark:text-dark-200">Database Settings</h2>

    <div>
      <label for="database-torrent-status-update-interval" class="input-label">Torrent Status Update Interval (seconds)</label>
      <input type="number" id="database-torrent-status-update-interval" class="input" v-model="settings.database.torrent_info_update_interval">
    </div>

  </div>
</template>

<script>
export default {
  name: "DatabaseSettings",
  props: ['settings'],
}
</script>

<style scoped>

</style>
