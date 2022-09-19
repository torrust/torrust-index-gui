<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="w-full h-full flex flex-col">
        <div class="p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
          <span class="text-slate-200 font-semibold">movie.mp4</span>
          <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-slate-500 font-semibold">
            <DatabaseIcon class="mr-1" size="18" />
            <span class="hidden md:block">4.7 GB</span>
          </div>
        </div>
        <div class="mt-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
          <span class="text-slate-200 font-semibold">images/poster.jpg</span>
          <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-slate-500 font-semibold">
            <DatabaseIcon class="mr-1" size="18" />
            <span class="hidden md:block">320 KB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatabaseIcon } from "@vue-hero-icons/outline"

export default {
  name: "TorrentFilesTab",
  components: {DatabaseIcon}
}
</script>

<style scoped>

</style>
