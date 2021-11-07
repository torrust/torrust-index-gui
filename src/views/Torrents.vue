<template>
  <div class="bg-primary p-6 rounded-3xl">
    <div v-if="search" class="flex flex-row">
      <h2 class="text-gray-400">Search results for '{{ this.search }}'</h2>
      <button @click="clearSearch" class="px-2 ml-2 text-sm rounded-xl bg-red-500 bg-opacity-10 text-red-400 hover:text-red-500">Clear search</button>
    </div>
    <div class="flex justify-between">
      <h1 class="view-title text-white">Browse Torrents</h1>
      <TableOrder :sorting.sync="params.sorting"/>
    </div>
    <router-view/>
    <TorrentList v-if="torrents.results.length > 0" :torrents="torrents.results" />
    <Pagination v-if="torrents.results.length > 0" :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.total" :page-size="pageSize" />
    <div v-else class="py-6 text-gray-300">This category has no results.</div>
  </div>
</template>

<script>
import TorrentList from "../components/TorrentList";
import Pagination from "../components/Pagination";
import TableOrder from "../components/TableOrder";
import HttpService from "@/common/http-service";
import {mapState} from "vuex";

export default {
  name: "Torrents",
  components: {TableOrder, Pagination, TorrentList},
  props: {
    sorting: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    params: {
      sorting: ''
    },
    search: '',
    torrents: {
      total: 0,
      results: []
    },
    currentPage: 1,
    pageSize: 20,
  }),
  methods: {
    loadTorrents(page, sort) {
      HttpService.get(`/torrents?page_size=${this.pageSize}&page=${page-1}&sort=${sort}&categories=${this.categoryFilters.join(',')}&search=${this.search}`, (res) => {
        this.torrents = res.data.data;
      }).catch(() => {
      });
    },
    clearSearch() {
      this.$router.replace({ query: {...this.$route.query, search: ''}})
    }
  },
  computed: {
    ...mapState(['categoryFilters']),
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    '$route.query.search': function (search) {
      search ? this.search = search : this.search = '';
      this.loadTorrents(this.currentPage, this.sorting);
    },
    filters() {
      this.loadTorrents(this.currentPage, this.sorting);
    },
    sorting(newSort) {
      this.loadTorrents(this.currentPage, newSort);
    },
    currentPage(newPage) {
      this.loadTorrents(newPage, this.sorting);
    },
    categoryFilters() {
      this.loadTorrents(this.currentPage, this.sorting);
    }
  },
  mounted() {
    if (this.sorting) this.params.sorting = this.sorting;
    this.$route.query.search ? this.search = this.$route.query.search : this.search = '';
    this.loadTorrents(this.currentPage, this.sorting);
  }
}
</script>

<style scoped>

</style>
