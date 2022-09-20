<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="w-full h-full flex flex-col">
        <div
            v-for="tracker in torrent.trackers"
            class="mb-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl overflow-x-auto"
        >
          <span class="text-slate-200 font-semibold">{{ tracker }}</span>
<!--          <div class="flex flex-row flex-nowrap justify-between">-->
<!--            <div class="px-4 py-2 mr-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">-->
<!--              <span id="seeders" class="text-green-500 font-semibold">0</span>-->
<!--            </div>-->
<!--            <div class="px-4 py-2 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">-->
<!--              <span id="leechers" class="text-red-500 font-semibold">0</span>-->
<!--            </div>-->
<!--          </div>-->
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
