<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="w-full h-full flex flex-col">
        <div class="px-6 py-4 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
          <span class="text-slate-200 font-semibold">https://tracker.torrust.org/announce</span>
          <div class="flex flex-row flex-nowrap justify-between">
            <div class="px-4 py-2 mr-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
              <span id="seeders" class="text-green-500 font-semibold">246</span>
            </div>
            <div class="px-4 py-2 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
              <span id="leechers" class="text-red-500 font-semibold">687</span>
            </div>
          </div>
        </div>
        <div class="mt-3 px-6 py-4 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
          <span class="text-slate-200 font-semibold">udp://tracker.dutchbits.nl:6969</span>
          <div class="flex flex-row flex-nowrap justify-between">
            <div class="px-4 py-2 mr-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
              <span id="seeders" class="text-green-500 font-semibold">0</span>
            </div>
            <div class="px-4 py-2 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
              <span id="leechers" class="text-red-500 font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TorrentTrackersTab"
}
</script>

<style scoped>

</style>
