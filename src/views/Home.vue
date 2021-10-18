<template>
  <div class="bg-primary p-6 rounded-3xl">
    <div class="flex justify-between">
      <h1 class="view-title text-white">Most Popular</h1>
    </div>

    <router-view/>

    <TorrentList v-if="torrents.results.length > 0" :torrents="torrents.results" />
    <Pagination v-if="torrents.results.length > 0" :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.total" :page-size="pageSize" />
    <div v-else class="py-6 text-gray-300">This category has no results.</div>
  </div>
</template>

<script>
import TorrentList from "@/components/TorrentList";
import Pagination from "@/components/Pagination";
import HttpService from "@/common/http-service";

export default {
  name: 'Home',
  components: {Pagination, TorrentList},
  data: () => ({
    category: 'popular',
    torrents: {
      total: 0,
      results: []
    },
    currentPage: 1,
    pageSize: 20,
  }),
  methods: {
    loadTorrents(category, page) {
      HttpService.get(`/category/${category}/torrents?page_size=${this.pageSize}&page=${page-1}`, (res) => {
        this.torrents = res.data.data;
      }).catch(() => {
      });
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    currentPage(newPage) {
      this.loadTorrents(this.category, newPage);
    }
  },
  mounted() {
    this.loadTorrents(this.category, this.currentPage);
  }
}
</script>
