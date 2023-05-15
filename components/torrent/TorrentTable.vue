<template>
  <div class="flex flex-col border-base-content/20 rounded-2xl grow w-full rounded-lg overflow-hidden">
    <table class="table-auto text-center bg-base-200">
      <thead>
      <tr class="text-sm text-base-content/75">
        <th class="py-2">Name</th>
        <th>Size</th>
        <th>Date</th>
        <th>Uploader</th>
        <th>Seeders</th>
        <th>Leechers</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(torrent, index) in torrents" :key="index" class="bg-base-100 text-sm">
        <td class="pl-6 text-left font-bold"><span @click.stop="$router.push(`/torrent/${torrent.info_hash}`)" class="cursor-pointer hover:text-amber-500 duration-200">{{ torrent.title }}</span></td>
        <td>{{ fileSize(torrent.file_size) }}</td>
        <td>{{ timeSince(new Date(torrent.date_uploaded)) }} ago ({{ new Date(torrent.date_uploaded).toLocaleDateString() }})</td>
        <td>{{ torrent.uploader }}</td>
        <td class="text-green-500">{{ torrent.seeders }}</td>
        <td class="text-red-500">{{ torrent.leechers }}</td>
        <td>
          <div class="flex flex-row flex-nowrap items-center justify-center font-semibold">
            <div class="ml-2 w-10 h-10 text-base-content/50 hover:text-base-content flex flex-col shrink-0 items-center justify-center duration-500">
              <ArrowDownTrayIcon class="w-5" />
            </div>
            <div class="ml-2 w-10 h-10 text-base-content/50 hover:text-base-content flex flex-col shrink-0 items-center justify-center duration-500">
              <LinkIcon class="w-5" />
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { PropType } from "vue";
import { TorrentCompact } from "torrust-index-types-lib";
import { fileSize, timeSince, ref } from "#imports";

const props = defineProps({
  torrents: Array as PropType<Array<TorrentCompact>>
});

const isOpenList = ref([]);

isOpenList.value = new Array(props.torrents.length).fill(false);

function toggleOpen (index: number) {
  isOpenList.value[index] = !isOpenList.value[index];
}
</script>