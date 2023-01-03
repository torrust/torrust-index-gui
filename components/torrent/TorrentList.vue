<template>
  <div>
    <div class="px-2 py-4 flex flex-row flex-nowrap text-themeText text-sm font-semibold border-2 border-transparent">
      <div class="pl-4">Torrent</div>
    </div>
    <div class="p-2 flex flex-col border-2 border-secondary rounded-2xl grow w-full">
      <div class="flex flex-col">
        <a
            v-for="(torrent, index) in torrents" :key="index"
            @click="$router.push(`/torrent/${torrent.torrent_id.toString()}`)"
            class="flex flex-col rounded-2xl bg-transparent hover:bg-secondary text-sm cursor-pointer duration-200 group"
        >
          <div class="px-4 pt-4 pb-4 group-hover:pb-2 flex flex-row flex-nowrap justify-start items-center rounded-2xl w-full">
            <div class="flex flex-col flex-nowrap justify-start items-center font-semibold overflow-hidden grow">
              <span class="whitespace-nowrap text-ellipsis group-hover:text-[0.95rem] text-themeText overflow-hidden w-full duration-200">{{ torrent.title }}</span>
              <div class="mt-1 flex flex-row flex-nowrap justify-start items-start w-full">
                <span class="whitespace-nowrap text-themeText/50 text-xs">{{ fileSize(torrent.file_size) }}</span>
                <span class="ml-2 whitespace-nowrap text-themeText/50 text-xs">{{ new Date(torrent.date_uploaded).toLocaleDateString() }} ({{ timeSince(new Date(torrent.date_uploaded)) }}) ago</span>
                <a class="ml-2 whitespace-nowrap text-xs text-accent">u/{{ torrent.uploader }}</a>
              </div>
            </div>
            <div class="flex flex-col flex-nowrap justify-center items-center">
              <div class="flex flex-row flex-nowrap text-center font-semibold rounded-2xl">
                <div class="w-10 h-10 flex flex-col shrink-0 justify-center text-green-500 border-2 border-secondary group-hover:border-tertiary rounded-2xl duration-200">{{ torrent.seeders }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 justify-center text-red-500 border-2 border-secondary group-hover:border-tertiary rounded-2xl duration-200">{{ torrent.leechers }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 items-center justify-center text-themeText/50 hover:text-themeText bg-secondary group-hover:bg-tertiary rounded-2xl duration-200">
                  <ArrowDownTrayIcon class="w-6"/>
                </div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 items-center justify-center text-themeText/50 hover:text-themeText bg-secondary group-hover:bg-tertiary rounded-2xl duration-200">
                  <LinkIcon class="w-6" />
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 pt-2 pb-4 hidden group-hover:flex flex-row flex-nowrap justify-start items-start w-full duration-1000">
            <TorrentListTorrentDetails :torrent-id="torrent.torrent_id" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarsArrowUpIcon, ChevronDownIcon, ChevronRightIcon, CircleStackIcon, ArrowDownTrayIcon, LinkIcon } from "@heroicons/vue/24/outline";
import {Ref} from "@vue/reactivity";
import {fileSize, timeSince, ref} from "#imports";
import {PropType} from "@vue/runtime-core";
import {TorrentCompact} from "~/types/torrent";

enum Direction {
  ASC,
  DESC
}

enum Sorting {
  name,
  seeders,
  leechers,
  uploaded,
  size
}

type Sort = {
  name: Sorting,
  direction: Direction
}

const props = defineProps({
  torrents: Array as PropType<Array<TorrentCompact>>,
  updateSorting: Function,
  sorting: Object,
})

const sort: Ref<Sort> = ref({
  name: Sorting.uploaded,
  direction: Direction.DESC
});
</script>
