<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-row justify-between">
        <h2 class="mr-1 text-2xl text-left text-themeText font-medium">Trackers</h2>
      </div>
      <div class="w-full h-full flex flex-col">
        <div
            v-for="tracker in torrent.trackers"
            class="mb-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 dark:border-white/5 rounded-2xl overflow-x-auto"
        >
          <span class="text-themeText font-semibold">{{ tracker }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TorrentTrackersTab",
  props: {
    torrent: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
}
</script>

<style scoped>

</style>
