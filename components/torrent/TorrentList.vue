<template>
  <div class="flex flex-col border-base-content/20 rounded-2xl grow w-full">
    <div class="flex flex-col gap-3">
      <a
        v-for="(torrent, index) in torrents"
        :key="index"
        class="flex flex-col rounded-2xl bg-base-100 text-sm cursor-pointer group"
        @click="toggleOpen(index)"
      >
        <div class="px-4 pt-4 pb-4 flex flex-row flex-nowrap justify-start items-center rounded-2xl w-full">
          <div class="flex flex-col flex-nowrap justify-start items-center font-semibold overflow-hidden grow">
            <div class="flex flex-row gap-1 items-center w-full">
              <span class="whitespace-nowrap text-ellipsis text-neutral-content overflow-hidden">{{ torrent.title }}</span>
              <ChevronRightIcon class="w-5 text-base-content/50 group-hover:text-base-content" :class="{ 'rotate-90': isOpenList[index] }" />
            </div>
            <div class="mt-1 flex flex-row flex-nowrap justify-start items-start w-full">
              <span class="whitespace-nowrap text-neutral-content/50 text-xs">{{ fileSize(torrent.file_size) }}</span>
              <span class="ml-2 whitespace-nowrap text-neutral-content/50 text-xs">{{ new Date(torrent.date_uploaded).toLocaleDateString() }} ({{ timeSince(new Date(torrent.date_uploaded)) }}) ago</span>
              <a class="ml-2 whitespace-nowrap text-neutral-content/50 text-xs">u/{{ torrent.uploader }}</a>
            </div>
          </div>
          <div class="flex flex-col flex-nowrap justify-center items-center">
            <div class="flex flex-row flex-nowrap text-center font-semibold rounded-2xl">
              <div class="w-10 h-10 flex flex-col shrink-0 justify-center text-green-500 rounded-2xl">{{ torrent.seeders }}</div>
              <div class="ml-2 w-10 h-10 flex flex-col shrink-0 justify-center text-red-500 rounded-2xl">{{ torrent.leechers }}</div>
              <div class="ml-2 w-10 h-10 text-base-content/50 hover:text-base-content flex flex-col shrink-0 items-center justify-center rounded-2xl duration-500">
                <ArrowDownTrayIcon class="w-6" />
              </div>
              <div class="ml-2 w-10 h-10 text-base-content/50 hover:text-base-content flex flex-col shrink-0 items-center justify-center rounded-2xl duration-500">
                <LinkIcon class="w-6" />
              </div>
            </div>
          </div>
        </div>
        <template v-if="isOpenList[index]">
          <div class="px-4 pt-2 pb-4 flex flex-row flex-nowrap justify-start items-start w-full duration-1000">
            <TorrentListTorrentDetails :torrent-id="torrent.torrent_id" />
          </div>
        </template>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { Ref, PropType } from "vue";
import { TorrentCompact } from "torrust-index-types-lib";
import { fileSize, timeSince, ref } from "#imports";

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
  sorting: Object
});

const sort: Ref<Sort> = ref({
  name: Sorting.uploaded,
  direction: Direction.DESC
});

const isOpenList = ref([]);

isOpenList.value = new Array(props.torrents.length).fill(false);

function toggleOpen (index: number) {
  isOpenList.value[index] = !isOpenList.value[index];
}
</script>
