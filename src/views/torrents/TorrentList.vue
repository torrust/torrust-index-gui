<template>
  <div>
    <div class="px-2 py-4 flex flex-row flex-nowrap text-dark-400 text-sm font-semibold border-2 border-transparent">
      <div class="pl-4">Torrent</div>
    </div>
    <div class="p-2 flex flex-col border-2 border-dark-800 rounded-2xl grow w-full">
      <div class="flex flex-col">
        <a
            v-for="(torrent, index) in torrents" :key="index"
            @click="$router.push(`/torrent/${torrent.torrent_id.toString()}`)"
            class="flex rounded-2xl bg-transparent hover:bg-dark-800/50 text-sm text-dark-200 hover:text-white cursor-pointer transition duration-200"
        >
          <div class="p-4 flex flex-row flex-nowrap justify-start rounded-2xl w-full">
            <div class="flex flex-col flex-nowrap justify-start items-center font-semibold overflow-hidden grow">
              <span class="whitespace-nowrap text-ellipsis overflow-hidden w-full">{{ torrent.title }}</span>
              <div class="mt-1 flex flex-row flex-nowrap justify-start items-start w-full">
                <span class="whitespace-nowrap text-dark-accent-600 text-xs">{{ fileSize(torrent.file_size) }}</span>
                <span class="ml-2 whitespace-nowrap text-dark-400 text-xs">{{ new Date(torrent.date_uploaded).toLocaleDateString() }} ({{ timeSince(torrent.date_uploaded) }}) ago</span>
                <a class="ml-2 whitespace-nowrap text-dark-accent-600 hover:text-dark-accent-700 text-xs duration-200">u/{{ torrent.uploader }}</a>
              </div>
            </div>
            <div class="flex flex-col flex-nowrap">
              <div class="flex flex-row flex-nowrap text-center font-semibold rounded-2xl">
                <div class="w-10 h-10 flex flex-col shrink-0 justify-center text-green-500 bg-green-500/10 rounded-2xl">{{ torrent.seeders }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 justify-center text-red-500 bg-red-500/10 rounded-2xl">{{ torrent.leechers }}</div>
                <div class="ml-2 w-10 h-10 flex flex-col shrink-0 items-center justify-center text-white bg-dark-accent-600 hover:bg-dark-accent-700 rounded-2xl duration-200">
                  <DownloadIcon size="18"/>
                </div>
                <div class="ml-2 w-10 h-10 flex shrink-0 flex-col items-center justify-center text-black bg-white hover:bg-dark-200 rounded-2xl duration-200">
                  <ClipboardIcon size="18"/>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
<!--  <div class="flex flex-col">-->
<!--    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">-->
<!--      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">-->
<!--        <div class="overflow-hidden border-b border-slate-800">-->
<!--          <table class="min-w-full">-->
<!--            <thead class="text-white rounded-md border-b border-t border-slate-800">-->
<!--              <tr>-->
<!--                <th v-for="(column, index) in table_columns" :key="column" @click="changeSort(column)"-->
<!--                    scope="col" class="px-4 py-3" :class="{ 'rounded-l-md': column === 'name' }"-->
<!--                >-->
<!--                  <button-->
<!--                      class="flex flex-row justify-start items-center text-left text-sm font-semibold capitalize"-->
<!--                  >-->
<!--                    <span>{{ column }}</span>-->
<!--                    <SortAscendingIcon size="14" v-if="sorting.name===column&&sorting.direction==='ASC'" class="ml-1" />-->
<!--                    <SortDescendingIcon size="14" v-if="sorting.name===column&&sorting.direction==='DESC'" class="ml-1" />-->
<!--                  </button>-->
<!--                </th>-->
<!--                <th scope="col" class="px-4 py-3 text-left text-sm font-semibold capitalize rounded-r-md">-->
<!--                  Uploader-->
<!--                </th>-->
<!--              </tr>-->
<!--            </thead>-->
<!--            <tbody class="divide-y divide-slate-800 text-slate-400">-->
<!--              <tr-->
<!--                  v-for="(torrent, index) in torrents" :key="index"-->
<!--                  @click="$router.push(`/torrent/${torrent.torrent_id.toString()}`)"-->
<!--                  class="duration-200"-->
<!--              >-->
<!--                <td>-->
<!--                  <div class="flex flex-row items-center">-->
<!--                    <span>{{ torrent.title }}</span>-->
<!--                  </div>-->
<!--                </td>-->
<!--                <td class="text-green-500 font-light">-->
<!--                  {{ torrent.seeders }}-->
<!--                </td>-->
<!--                <td class="text-red-500 font-light">-->
<!--                  {{ torrent.leechers }}-->
<!--                </td>-->
<!--                <td>-->
<!--                  {{ timeSince(torrent.date_uploaded) }} ago-->
<!--                </td>-->
<!--                <td>-->
<!--                  {{ fileSize(torrent.file_size) }}-->
<!--                </td>-->
<!--                <td>-->
<!--                  {{ torrent.uploader }}-->
<!--                </td>-->
<!--              </tr>-->
<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { SortAscendingIcon, SortDescendingIcon, DatabaseIcon, DownloadIcon, ClipboardIcon } from "@vue-hero-icons/outline"
import {mapState} from "vuex";

export default {
  name: "TorrentList",
  components: {SortAscendingIcon, SortDescendingIcon, DatabaseIcon, DownloadIcon, ClipboardIcon},
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
  @apply cursor-pointer bg-transparent dark:bg-dark-800 hover:bg-gradient-to-r hover:from-slate-800/10 hover:via-slate-800/30 hover:to-slate-800/10 rounded-2xl transition duration-200;
}
</style>
