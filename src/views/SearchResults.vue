<template>
  <div class="bg-primary p-6 rounded-3xl">
    <div class="flex justify-between">
      <h1 class="view-title text-white">Search Results For '{{ searchQuery }}'</h1>
    </div>

    <router-view/>

    <TorrentList v-if="torrents.results.length > 0" :torrents="torrents.results" />
    <Pagination v-if="torrents.results.length > 0" :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.total" :page-size="pageSize" />
    <div v-else class="py-6 text-gray-300">This search has no results.</div>
  </div>
</template>

<script>
import TorrentList from "@/components/TorrentList";
import Pagination from "@/components/Pagination";
import HttpService from "@/common/http-service";

export default {
  name: 'SearchResults',
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
  props: {
    searchQuery: {
      type: String,
      default: '',
    }
  },
  methods: {
    loadTorrents(query, page) {
      if (query) {
        HttpService.get(`/search/?query=${query}&page=${page - 1}`, (res) => {
          this.torrents = res.data.data;
        }).catch(() => {});
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    searchQuery(query) {
      this.loadTorrents(query, this.currentPage);
    },
    currentPage(newPage) {
      this.loadTorrents(this.searchQuery, newPage);
    }
  },
  mounted() {
    this.loadTorrents(this.searchQuery, this.currentPage);
  }
}
</script>
