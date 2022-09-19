<template>
  <div class="flex flex-col basis-full max-w-md">
    <div class="flex flex-col">
      <div class="mb-8 px-4 md:px-7 flex flex-col">
        <div class="mb-4 flex flex-col">
          <div class="mb-8 flex flex-col">
            <span class="mb-1 font-semibold text-sky-600">Movies</span>
            <h2 class="mb-1 text-slate-200 font-bold">This is a cool movie torrent in mp4 format.</h2>
            <span class="text-xs md:text-sm font-semibold text-slate-600">F27D89F8F200192176EE7C1BF5720FD5BE8FB02F</span>
          </div>
          <div class="flex flex-col">
            <span class="mb-1 text-sm text-slate-500 font-semibold uppercase text-xs">Uploader</span>
            <div class="flex flex-row flex-nowrap items-center">
              <a class="mr-1 font-semibold text-sky-600">Warm Beer</a>
              <BadgeCheckIcon class="text-yellow-500" size="18" />
            </div>
          </div>
        </div>
        <div class="mb-4 h-0.5 flex flex-col bg-slate-800/60"></div>
        <div class="flex flex-row flex-nowrap justify-between">
          <div class="flex flex-row flex-nowrap text-slate-500 font-semibold text-sm">
            <div class="mr-1 h-8 px-3 flex flex-row flex-nowrap items-center justify-center">
              <DatabaseIcon class="mr-1" size="18" />
              <span>317.15 MB</span>
            </div>
            <div class="h-8 px-3 flex flex-row flex-nowrap items-center justify-center">
              <CalendarIcon class="mr-1" size="18" />
              <span>16/07/2020</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex flex-col">
        <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 rounded-2xl">
          <div class="flex flex-col">
            <div class="mb-3 flex flex-row flex-nowrap justify-between">
              <div class="mr-3 flex flex-col grow">
                <span class="mb-1 px-2 text-xs text-slate-500 font-semibold">SEEDERS</span>
                <div class="p-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                  <span id="seeders" class="text-green-500 font-semibold">246</span>
                </div>
              </div>
              <div class="flex flex-col grow">
                <span class="mb-1 px-2 text-xs text-slate-500 font-semibold">LEECHERS</span>
                <div class="p-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                  <span id="seeders" class="text-red-500 font-semibold">687</span>
                </div>
              </div>
            </div>
            <button class="mt-3 px-4 h-12 bg-white text-sm text-black font-medium rounded-2xl">Magnet link</button>
            <button class="mt-3 px-4 h-12 bg-sky-500 text-sm text-white font-medium rounded-2xl">Download torrent</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatabaseIcon, CalendarIcon } from "@vue-hero-icons/outline";
import { BadgeCheckIcon } from "@vue-hero-icons/solid";

export default {
  name: "TorrentActionCard",
  components: {DatabaseIcon, CalendarIcon, BadgeCheckIcon}
}
</script>

<style scoped>

</style>
