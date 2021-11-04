<template>
  <div class="bg-primary p-6 rounded-3xl">
    <div class="flex justify-between">
      <h1 class="view-title text-white">Browse Torrents</h1>
      <TableOrder v-if="torrents.results.length > 0" :sorting.sync="params.sorting"/>
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

export default {
  name: "Torrents",
  components: {TableOrder, Pagination, TorrentList},
  props: {
    sorting: {
      type: String,
      default: '',
    },
    searchParam: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    params: {
      sorting: ''
    },
    torrents: {
      total: 0,
      results: []
    },
    currentPage: 1,
    pageSize: 20,
  }),
  methods: {
    loadTorrents(page, sort) {
      HttpService.get(`/torrents/?page_size=${this.pageSize}&page=${page-1}&sort=${sort}`, (res) => {
        this.torrents = res.data.data;
      }).catch(() => {
      });
    }
  },
  computed: {
    category() {
      return this.$route.params?.name;
    },
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    category(newCat) {
      this.loadTorrents(newCat, this.currentPage, this.sorting);
    },
    sorting(newSort) {
      this.loadTorrents(this.category, this.currentPage, newSort);
    },
    currentPage(newPage) {
      this.loadTorrents(this.category, newPage, this.sorting);
    }
  },
  mounted() {
    if (this.sorting) this.params.sorting = this.sorting;
    this.loadTorrents(this.currentPage, this.sorting);
  }
}
</script>

<style scoped>

</style>
