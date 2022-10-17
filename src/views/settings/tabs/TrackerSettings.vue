<template>
  <div id="tracker-settings" class="flex flex-col gap-6">

    <h2 class="text-3xl font-medium text-slate-200 dark:text-dark-200">Tracker Settings</h2>

    <div>
      <label for="tracker-announce-url" class="input-label">Announce URL</label>
      <input type="text" id="tracker-announce-url" class="input" v-model="settings.tracker.url">
    </div>

    <div>
      <label for="tracker-mode" class="input-label">Mode</label>
      <select id="tracker-mode" class="input" v-model="settings.tracker.mode">
        <option v-for="mode in TrackerMode" :value="mode.name">{{ mode.name }}</option>
      </select>
    </div>

    <div>
      <label for="tracker-api-url" class="input-label">API URL</label>
      <input type="text" id="tracker-api-url" class="input" v-model="settings.tracker.api_url">
    </div>

    <div>
      <label for="tracker-api-token" class="input-label">API Token</label>
      <input type="text" id="tracker-api-token" class="input" v-model="settings.tracker.token">
    </div>

    <div>
      <label for="tracker-token-validity" class="input-label">New Private Tracker Key Validity (seconds)</label>
      <input type="number" id="tracker-token-validity" class="input" v-model="settings.tracker.token_valid_seconds">
    </div>

  </div>
</template>

<script>
export default {
  name: "TrackerSettings",
  props: ['settings'],
  data: () => ({
    TrackerMode: [{ name: "Public" }, { name: "Private" }, { name: "Whitelisted" }, { name: "PrivateWhitelisted" }],
  })
}
</script>

<style scoped>

</style>
