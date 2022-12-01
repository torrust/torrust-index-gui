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
            class="flex rounded-2xl bg-transparent hover:bg-secondary/50 text-sm text-themeText hover:text-white cursor-pointer transition duration-200"
        >
          <div class="p-4 flex flex-row flex-nowrap justify-start rounded-2xl w-full">
            <div class="flex flex-col flex-nowrap justify-start items-center font-semibold overflow-hidden grow">
              <span class="whitespace-nowrap text-ellipsis overflow-hidden w-full">{{ torrent.title }}</span>
              <div class="mt-1 flex flex-row flex-nowrap justify-start items-start w-full">
                <span class="whitespace-nowrap text-accent-600 text-xs">{{ fileSize(torrent.file_size) }}</span>
                <span class="ml-2 whitespace-nowrap text-themeText text-xs">{{ new Date(torrent.date_uploaded).toLocaleDateString() }} ({{ timeSince(torrent.date_uploaded) }}) ago</span>
                <a class="ml-2 whitespace-nowrap text-accent-600 hover:text-accent-700 text-xs duration-200">u/{{ torrent.uploader }}</a>
              </div>
            </div>
            <div class="flex flex-col flex-nowrap">
              <div class="flex flex-row flex-nowrap text-center font-semibold rounded-2xl">
                <div class="w-10 h-10 flex flex-col shrink-0 justify-center text-green-500 bg-green-500/10 rounded-2xl">{{ torrent.seeders }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 justify-center text-red-500 bg-red-500/10 rounded-2xl">{{ torrent.leechers }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 items-center justify-center text-white bg-secondary rounded-2xl duration-200">
                  <ArrowDownTrayIcon size="18"/>
                </div>
                <div class="ml-2 w-10 h-10 flex shrink-0 flex-col items-center justify-center text-black bg-white rounded-2xl duration-200">
                  <ClipboardIcon size="18"/>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { BarsArrowUpIcon, ArrowSmallDownIcon, CircleStackIcon, ArrowDownTrayIcon, ClipboardIcon } from "@heroicons/vue/24/outline";
import {mapState} from "vuex";

export default {
  name: "TorrentList",
  components: {BarsArrowUpIcon, ArrowSmallDownIcon, CircleStackIcon, ArrowDownTrayIcon, ClipboardIcon},
  props: {
    torrents: Array,
    updateSorting: Function,
    sorting: Object,
  },
  data: () => ({
    sort: {
      name: 'uploaded',
      direction: 'DESC'
    },
    table_columns: [
      'name',
      'seeders',
      'leechers',
      'uploaded',
      'size',
    ]
  }),
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    changeSort(sort) {
      let direction = 'ASC';
      if (this.sorting.name === sort) {
        if (this.sorting.direction === 'ASC') {
          direction = 'DESC'
        } else {
          direction = 'ASC'
        }
      } else {
        this.sorting.name = sort;
        direction = 'DESC'
      }
      this.updateSorting({name: sort, direction});
    }
  }
}
</script>

<style scoped>
td {
  @apply px-4 py-4 whitespace-nowrap;
}

tbody tr {
  @apply cursor-pointer bg-transparent hover:bg-gradient-to-r hover:from-slate-800/10 hover:via-slate-800/30 hover:to-slate-800/10 rounded-2xl transition duration-200;
}
</style>
